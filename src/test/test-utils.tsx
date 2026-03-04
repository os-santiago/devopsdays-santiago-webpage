import { render, type RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { ReactElement } from "react";

interface RouterRenderOptions extends Omit<RenderOptions, "wrapper"> {
  route?: string;
}

export function renderWithRouter(
  ui: ReactElement,
  { route = "/", ...options }: RouterRenderOptions = {},
) {
  return render(ui, {
    wrapper: ({ children }) => <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>,
    ...options,
  });
}
