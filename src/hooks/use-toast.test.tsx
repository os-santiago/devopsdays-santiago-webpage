import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("use-toast", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.resetModules();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("reducer handles add, update, dismiss and remove", async () => {
    const { reducer } = await import("@/hooks/use-toast");

    const added = reducer(
      { toasts: [] },
      { type: "ADD_TOAST", toast: { id: "1", title: "A", open: true } },
    );
    expect(added.toasts).toHaveLength(1);
    expect(added.toasts[0].title).toBe("A");

    const updated = reducer(added, { type: "UPDATE_TOAST", toast: { id: "1", title: "B" } });
    expect(updated.toasts[0].title).toBe("B");

    const dismissed = reducer(updated, { type: "DISMISS_TOAST", toastId: "1" });
    expect(dismissed.toasts[0].open).toBe(false);

    const removedOne = reducer(dismissed, { type: "REMOVE_TOAST", toastId: "1" });
    expect(removedOne.toasts).toHaveLength(0);

    const removedAll = reducer(
      { toasts: [{ id: "2", open: true }] },
      { type: "REMOVE_TOAST", toastId: undefined },
    );
    expect(removedAll.toasts).toEqual([]);
  });

  it("exposes toast lifecycle via hook", async () => {
    const { useToast } = await import("@/hooks/use-toast");

    const { result } = renderHook(() => useToast());

    let controls: ReturnType<typeof result.current.toast> | undefined;
    act(() => {
      controls = result.current.toast({ title: "Initial" });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe("Initial");

    act(() => {
      controls?.update({ id: controls.id, title: "Updated" } as never);
    });
    expect(result.current.toasts[0].title).toBe("Updated");

    act(() => {
      controls?.dismiss();
    });
    expect(result.current.toasts[0].open).toBe(false);

    act(() => {
      vi.advanceTimersByTime(1_000_000);
    });
    expect(result.current.toasts).toHaveLength(0);
  });
});
