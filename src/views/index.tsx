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
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tristique velit lectus, sit amet mattis libero fermentum id. </p>
                <p>Pellentesque auctor aliquam erat, vitae luctus enim. Nulla posuere commodo ornare. Nullam id vehicula sapien. Vestibulum tempor metus nec libero imperdiet, non euismod orci maximus. </p>
                <p>Ut ullamcorper, massa vitae rhoncus pretium, sem metus auctor enim, vitae ornare arcu lorem vitae nisl.</p>
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
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tristique velit lectus, sit amet mattis libero fermentum id. </p>
                <p>Ut ullamcorper, massa vitae rhoncus pretium, sem metus auctor enim, vitae ornare arcu lorem vitae nisl.</p>
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
                <p> Although mathematics will help you arrive at elegant and efficient methods, the use of a computer and programming skills will be required to solve most problems.</p>
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