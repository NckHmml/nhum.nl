import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import i18n from "i18next";

import Footer from ".";

test("Component renders", () => {
  render(<Footer />);

  const text = i18n.t("nav.languages.nl");
  expect(screen.queryByText(text)).toBeInTheDocument();
});

test("Component renders in other languages", async () => {
  const { container } = render(<Footer />);

  await userEvent.selectOptions(
    container.querySelector("select") as HTMLElement,
    container.querySelector("option[value='ja']") as HTMLElement,
  );
  const text = i18n.t("nav.languages.label", { lng: "ja" });
  expect(screen.queryByText(text)).toBeInTheDocument();
});