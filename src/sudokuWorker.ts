import { solveSudoku } from "./solver";

// Web worker to solve the sudoku without blocking the main thread
onmessage = (ev: MessageEvent<Array<Array<number>>>) => {
  const result = solveSudoku(ev.data);
  postMessage(result);
};