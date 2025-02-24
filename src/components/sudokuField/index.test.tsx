import { render, screen } from "@testing-library/react";

import SudokuField from ".";

test("Component renders", () => {
  render(<SudokuField />);

  expect(screen.queryAllByTestId("c-sudokucell").length).toBe(81);
});