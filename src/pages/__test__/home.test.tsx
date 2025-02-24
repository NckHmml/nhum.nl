import { render, screen } from "@testing-library/react";
import i18next from "i18next";

import HomePage from "../home";

test("Component renders", () => {
  render(<HomePage />);

  const text = i18next.t("home.intro");
  expect(screen.queryByText(text)).toBeInTheDocument();
});