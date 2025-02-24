import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import i18next from "i18next";

import KanaTestPage from "../kanaTest";

const mockNavigate = vi.fn();
beforeAll(() => {
  vi.mock("react-router", () => {
    return {
      "useNavigate": vi.fn(() => mockNavigate),
    };
  });
});

afterAll(() => {
  vi.resetAllMocks();
});

test("Component renders", () => {
  render(<KanaTestPage />);

  const text = i18next.t("kana.title");
  expect(screen.queryByText(text)).toBeInTheDocument();
});

test("Cancel navigates away", async () => {
  render(<KanaTestPage />);

  const text = i18next.t("kana.cancel");
  await userEvent.click(screen.getByText(text));
  expect(mockNavigate).toBeCalledWith("/kana");
});