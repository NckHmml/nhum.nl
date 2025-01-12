import { observer } from "mobx-react";
import SudokuCell from "./sudokuCell";
import { instance as sudokuStore } from "../redux/sudoku";

const SudokuField: React.FC = observer(() => {
  const rows = sudokuStore.field.map((rowCells, row) => (
    <div key={row}>
      <style jsx>{`
        div {
          /* Let the grid-template fall through */
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

  return (
    <div>
      <style jsx>{`
        div {
          display: grid;
          grid-template-columns: repeat(9, 1fr);
          grid-auto-rows: 1fr;
        }
      `}</style>
      {rows}
    </div>
  );
});

export default SudokuField;