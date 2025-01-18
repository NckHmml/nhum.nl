import { observer } from "mobx-react";
import { classNames } from "../helper";
import { instance as sudokuStore } from "../redux/sudoku";
import I18N from "./i18n";


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
        <button className="pure-button button-secondary" onClick={() => sudokuStore.setExample(1)}><I18N options={{ n: 1 }}>sudoku.example</I18N></button>
        <button className="pure-button button-secondary" onClick={() => sudokuStore.setExample(2)}><I18N options={{ n: 2 }}>sudoku.example</I18N></button>
        <button className="pure-button button-secondary" onClick={() => sudokuStore.setExample(3)}><I18N options={{ n: 3 }}>sudoku.example</I18N></button>
      </div>
      <div>
        <button className={solveButtonClass} onClick={() => sudokuStore.fieldValid ? sudokuStore.solve() : null}><I18N>sudoku.solve</I18N></button>
        <button className="pure-button button-secondary" onClick={() => sudokuStore.clear()}><I18N>sudoku.clear</I18N></button>
      </div>
    </>
  );
});

export default SudokuButtons;