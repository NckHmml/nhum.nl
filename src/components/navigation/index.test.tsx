import { render, screen } from "@testing-library/react";
import i18n from "i18next";

import Loader from ".";

beforeAll(() => {
  vi.mock("react-router-dom", () => {
    return {
      "NavLink": (props: object) => <a {...props} />,
    };
  });
});

afterAll(() => {
  vi.resetAllMocks();
});

test("Component renders", () => {
  render(<Loader />);

  const text = i18n.t("nav.sudoku");
  expect(screen.queryByText(text)).toBeInTheDocument();
});