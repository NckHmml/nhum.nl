import { observer } from "mobx-react";
import { classNames } from "../helper";
import sudokuStore from "../redux/sudoku";

const SudokuButtons: React.FC = observer(() => {
  const solveButtonClass = classNames({
    "pure-button button-primary": true,
    "pure-button-disabled": !sudokuStore.fieldValid,
  });

  return (
    <>
      <style jsx>{`
      div {
        text-align: center;
        margin: .5em auto;
      }

      button {
        margin: .5em;
      }
    `}</style>
      <div>
        <button className="pure-button button-secondary" onClick={() => sudokuStore.setExample(1)}>Example 1</button>
        <button className="pure-button button-secondary" onClick={() => sudokuStore.setExample(2)}>Example 2</button>
        <button className="pure-button button-secondary" onClick={() => sudokuStore.setExample(3)}>Example 3</button>
      </div>
      <div>
        <button className={solveButtonClass} onClick={() => sudokuStore.fieldValid ? sudokuStore.solve() : null}>Solve</button>
        <button className="pure-button button-secondary" onClick={() => sudokuStore.clear()}>Clear</button>
      </div>
    </>
  );
});

export default SudokuButtons;