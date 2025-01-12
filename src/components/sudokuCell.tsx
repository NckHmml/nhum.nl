
import { observer } from "mobx-react";
import { KeyboardEvent } from "react";
import { instance as sudokuStore } from "../redux/sudoku";

interface CellProps {
  row: number;
  cell: number;
  value: number;
}

const SudokuCell: React.FC<CellProps> = observer(({ row, cell, value }) => {
  let input: HTMLInputElement | null = null;

  const onChange = (event: KeyboardEvent<HTMLInputElement>) => {
    const key = event.key.toLowerCase();
    let newValue = parseInt(event.key);
    switch (key) {
      case "delete":
      case "backspace":
        newValue = 0;
        break;
      case "enter":
        return;
    }


    if (newValue === value || isNaN(newValue))
      return;
    sudokuStore.setCell(row, cell, newValue);
  };

  const onClick = () => {
    if (!input) return;
    input.value = "";
    input.focus();
  };

  const valid = sudokuStore.validity[row][cell];

  return (
    <>
      <style jsx>{`
        div {
          display: inline-block;
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          text-align: center;
          box-sizing: border-box;
          background-color: var(--background);
          border: 1px solid var(--color-background);
          border-bottom: var(--border-bottom);
          border-left: none;
        }

        div.invalid, div.invalid:hover {
          background-color: color-mix(in srgb, red 20%, transparent);
        } 

        div:hover {
          background-color: color-mix(in srgb, var(--color-primary) 20%, transparent);
        }

        div:nth-child(3n + 3):not(:nth-child(9n)) {
          border-right: 1px solid var(--color-border);
        }
        div:nth-child(9n) {
          /* Right most border */
          border-right: 1px solid var(--color-background);
        }
        div:nth-child(9n - 8) {
          /* Left most border */
          border-left: 1px solid var(--color-background);
        }

        span {
          width: 100%;
        }

        input { 
          margin: 0;
          padding: 0;
          height: 0;
          width: 0;
          border: 0;
          overflow: hidden;
          box-sizing: border-box;
        }
      `}</style>
      <div onClick={onClick} className={valid ? "valid" : "invalid"}>
        <input onKeyDown={onChange} ref={(ref) => input = ref} />
        <span>{value ? value : ""}</span>
      </div>
    </>
  );
});

export default SudokuCell;