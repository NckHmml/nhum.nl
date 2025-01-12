import SudokuButtons from "../components/sudokuButtons";
import SudokuField from "../components/sudokuField";

const Sudoku: React.FC = () => (
  <>
    <h1>Sudoku solver</h1>
    <p>Sudoku is a logic-based, combinatorial number-placement puzzle. The objective is to fill a 9×9 grid with digits so that each column, each row, and each of the nine 3×3 subgrids that compose the grid contains all of the digits from 1 to 9. The puzzle setter provides a partially completed grid, which for a well-posed puzzle has a single solution.</p>
    <p>I was solving puzzles while travelling, when I thought to myself "I wonder how hard it would be to solve these puzzles programmatically" and this resolver tool is the answer to that question.</p>
    <h2>Instructions</h2>
    <ul>
      <li>Click a cell to change its value by typing a number</li>
      <li>Fill the field according to the puzzle you want to solve</li>
      <li>Cells that are colored red, are in conflict with eachother</li>
      <li>Press "Solve puzzle" to start solving</li>
      <li>Press "Clear puzzle" to set all cells back to empty</li>
      <li>Use any of the example buttons for a prefilled field</li>
    </ul>

    <SudokuField />
    <SudokuButtons />
  </>
);

export default Sudoku;