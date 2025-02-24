import { render, screen } from "@testing-library/react";
import i18next from "i18next";
import { MemoryRouter } from "react-router";

import App from "../app";

beforeAll(() => {
  vi.mock("react-router-dom", async (importOriginal) => {
    const mod = await importOriginal<typeof import("react-router-dom")>();
    return {
      ...mod,
      "NavLink": (props: object) => <a {...props} />,
    };
  });
});

afterAll(() => {
  vi.resetAllMocks();
});

test("Component renders", () => {
  render(<MemoryRouter><App /></MemoryRouter>);

  const text = i18next.t("home.intro");
  expect(screen.queryByText(text)).toBeInTheDocument();
});

test("Routing works correct", () => {
  render(<MemoryRouter initialEntries={["/concepts/bots"]}><App /></MemoryRouter>);

  const text = i18next.t("concepts.bots.title");
  expect(screen.queryByText(text)).toBeInTheDocument();
});