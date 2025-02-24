import { render, screen } from "@testing-library/react";
import i18next from "i18next";

import SudokuPage from "../sudoku";

test("Component renders", () => {
  render(<SudokuPage />);

  const text = i18next.t("sudoku.title");
  expect(screen.queryByText(text)).toBeInTheDocument();
});