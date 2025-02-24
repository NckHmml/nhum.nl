import { SudokuStore } from "../sudoku";

test("Constructor calls without errors", () => {
  expect(() => new SudokuStore()).not.toThrow();
});