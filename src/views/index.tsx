import * as React from "react";
import { RouteComponentProps, Link } from "react-router-dom";

/**
 * Site index page
 */
export class Index extends React.Component<RouteComponentProps<void>, void> {
  render() {
    return (
      <div className="main-index">
        <div className="main-articles">
          <div className="group">
            <article className="g-md-12 g-24 main-article">
              <header>
                <h1>
                  <Link to="/kana">Kana learning tool</Link>
                </h1>
              </header>
              <section>
                <p>During the time I spent living in Japan, I wanted to at least be able to read the basic character (kana) sets called "Hiragana" and "Katakana" respectively.</p>
                <p>Sadly, in my quest to learn these sets, I was not able to find a tool to aid me in the process. So I ended up writing my own tool.</p>
              </section>
              <footer>
                <Link to="/kana">Read more..</Link>
              </footer>
            </article>
            <article className="g-md-12 g-24 main-article">
              <header>
                <h1>
                  <Link to="/sudoku">Sudoku solver</Link>
                </h1>
              </header>
              <section>
                <p>
                  Sudoku is a logic-based, combinatorial number-placement puzzle.
                  The objective is to fill a 9×9 grid with digits so that each column, each row, and each of the nine 3×3 subgrids that compose the grid contains all of the digits from 1 to 9.
                  The puzzle setter provides a partially completed grid, which for a well-posed puzzle has a single solution.
                </p>
                <p>I was solving puzzles while travelling, when I thought to myself "I wonder how hard it would be to solve these puzzles programmatically" and this resolver tool is the answer to that question.</p>
              </section>
              <footer>
                <Link to="/sudoku">Read more..</Link>
              </footer>
            </article>
          </div>
          <div className="group">
            <article className="g-md-12 g-24 main-article">
              <header>
                <h1>
                  <Link to="/euler">Project Euler</Link>
                </h1>
              </header>
              <section>
                <p>Project Euler is a series of challenging mathematical/computer programming problems that will require more than just mathematical insights to solve.</p>
                <p>Although mathematics will help you arrive at elegant and efficient methods, the use of a computer and programming skills will be required to solve most problems.</p>
              </section>
              <footer>
                <Link to="/euler">Read more..</Link>
              </footer>
            </article>
            <article className="g-md-12 g-24 main-article">
              <header>
                <h1>
                  <Link to="/password">Password Strength Evaluation</Link>
                </h1>
              </header>
              <section>
                <p>Over the years, people have trained themselves to use passwords that are hard to remember for humans, but easy to guess for computers.</p>
                <p>A library called Zxcvbn addresses this issue by estimating how long it would take to crack a password, thus determening the strength of it.</p>
              </section>
              <footer>
                <Link to="/password">Read more..</Link>
              </footer>
            </article>
          </div>
        </div>
      </div>
    );
  }
}