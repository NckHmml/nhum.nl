import I18N from "../components/i18n";
import SudokuButtons from "../components/sudokuButtons";
import SudokuField from "../components/sudokuField";

const Sudoku: React.FC = () => (
  <>
    <h1><I18N>sudoku.title</I18N></h1>
    <p><I18N>sudoku.description</I18N></p>
    <h2><I18N>sudoku.instructions.title</I18N></h2>
    <ul>
      <li><I18N>sudoku.instructions.0</I18N></li>
      <li><I18N>sudoku.instructions.1</I18N></li>
      <li><I18N>sudoku.instructions.2</I18N></li>
      <li><I18N>sudoku.instructions.3</I18N></li>
      <li><I18N>sudoku.instructions.4</I18N></li>
      <li><I18N>sudoku.instructions.5</I18N></li>
    </ul>

    <SudokuField />
    <SudokuButtons />
  </>
);

export default Sudoku;