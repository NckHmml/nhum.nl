import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import i18next from "i18next";
import { MemoryRouter } from "react-router";

import App from "~/app";

const rootComponent = (
  <MemoryRouter initialEntries={["/concepts"]}>
    <App />
  </MemoryRouter>
);

test("Component renders", () => {
  render(rootComponent);

  let text = i18next.t("concepts.bots.title");
  expect(screen.queryByText(text)).toBeInTheDocument();
  text = i18next.t("concepts.password.title");
  expect(screen.queryByText(text)).toBeInTheDocument();
  text = i18next.t("concepts.search.title");
  expect(screen.queryByText(text)).toBeInTheDocument();
});

test("Clicking 'Go to detail' for 'Bots' navigates to the correct sub page", async () => {
  const { container } = render(rootComponent);

  await userEvent.click(container.querySelector("a[href='/concepts/bots']")!);
  const text = i18next.t("concepts.bots.story.1");
  expect(screen.queryByText(text)).toBeInTheDocument();
});

test("Clicking 'Go to detail' for 'Password' navigates to the correct sub page", async () => {
  const { container } = render(rootComponent);

  await userEvent.click(container.querySelector("a[href='/concepts/password']")!);
  expect(screen.queryByText("The problem")).toBeInTheDocument();
});

test("Clicking 'Go to detail' for 'Search' navigates to the correct sub page", async () => {
  const { container } = render(rootComponent);

  await userEvent.click(container.querySelector("a[href='/concepts/search']")!);
  const text = i18next.t("concepts.search.story.4");
  expect(screen.queryByText(text)).toBeInTheDocument();
});