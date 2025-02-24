import { render, screen } from "@testing-library/react";
import i18next from "i18next";

import KanaPage from "../kana";

beforeAll(() => {
  vi.mock("react-router", () => {
    return {
      "useNavigate": vi.fn(() => vi.fn()),
    };
  });
});

afterAll(() => {
  vi.resetAllMocks();
});

test("Component renders", () => {
  render(<KanaPage />);

  const text = i18next.t("kana.title");
  expect(screen.queryByText(text)).toBeInTheDocument();
});