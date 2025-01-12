import { observer } from "mobx-react";
import SudokuCell from "./sudokuCell";
import sudokuStore from "../redux/sudoku";

const SudokuField: React.FC = observer(() => {
  return sudokuStore.field.map((rowCells, row) => (
    <div key={row}>
      <style jsx>{`
        div {
          display: contents;
        }

        div:nth-child(3n + 3):not(:nth-child(9n)) {
          --border-bottom: 1px solid var(--color-border);
        }
        div:nth-child(9n) {
          /* Bottom most border */
          --border-bottom: 1px solid var(--color-background);
        }

        div:nth-child(3n + 2) {
          --background: color-mix(in srgb, var(--color-background) 30%, transparent);
        }

      `}</style>
      {rowCells.map((value, cell) => <SudokuCell key={`${row}-${cell}`} row={row} cell={cell} value={value} />)}
    </div>
  ));
});

export default SudokuField;