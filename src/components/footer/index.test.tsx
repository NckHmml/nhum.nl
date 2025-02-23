import { render, screen } from "@testing-library/react";
import i18n from "i18next";

import Footer from ".";

test("Component renders", () => {
  render(<Footer />);

  const text = i18n.t("nav.languages.nl");
  expect(screen.getByText(text)).toBeDefined();
});