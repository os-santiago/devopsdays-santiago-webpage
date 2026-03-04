import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("px-2", "py-1", "text-sm")).toBe("px-2 py-1 text-sm");
  });

  it("resolves tailwind conflicts", () => {
    expect(cn("p-2", "p-4", "text-red-500", "text-blue-500")).toBe("p-4 text-blue-500");
  });

  it("ignores falsy values", () => {
    expect(cn("flex", false && "hidden", undefined, null, "items-center")).toBe("flex items-center");
  });
});
