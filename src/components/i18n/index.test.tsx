import { render, screen } from "@testing-library/react";
import i18n from "i18next";

import I18N from ".";

test("Component renders", () => {
  render(<I18N>nav.home</I18N>);

  const text = i18n.t("nav.home");
  expect(screen.queryByText(text)).toBeInTheDocument();
});

test("Passes key as text if key doesn't exist", () => {
  render(<I18N>key.that.doesnt.exist</I18N>);
  expect(screen.queryByText("key.that.doesnt.exist")).toBeInTheDocument();
});

test("Renders whitelisted HTML tags when flag enabled", () => {
  const { container } = render(<I18N withHtml>concepts.password.story</I18N>);
  expect(container.querySelector("h3")).not.toBeNull();
});

test("HTML does not render without flag", () => {
  const { container } = render(<I18N>concepts.password.story</I18N>);
  expect(container.querySelector("h3")).toBeNull();
});