import { Route, Routes, NavLink } from "react-router-dom";
import Home from "./pages/home";
import Sudoku from "./pages/sudoku";
import Kana from "./pages/kana";
import KanaTest from "./pages/kanaTest";

const App: React.FC = () => {
  return (
    <>
      <style jsx>{`
        nav {
          position: sticky;
          top: 0;
          z-index: 1;
          border-bottom: 1px solid var(--color-border);
          background-color: var(--color-white);
        }

        .content,
        .container {
          padding: 0 1em;
          margin: 0 auto;
          box-sizing: border-box;
        }

        @media screen and (min-width: 21cm) {
          .content,
          .container {
            max-width: 21cm;
          }
        }

        .content { 
          z-index: 0;
          padding: 1em 2em;
          width: 100%;
          box-shadow: 0 0 1em var(--color-shadow);
          background-color: var(--color-white);
        }
      `}</style>
      <nav className="pure-menu pure-menu-horizontal">
        <div className="container">
          <NavLink to="/" className="pure-menu-heading pure-menu-link">nhum.nl</NavLink>
          <ul className="pure-menu-list">
            <li className="pure-menu-item">
              <NavLink to="/sudoku" className="pure-menu-link">Sudoku</NavLink>
            </li>
            <li className="pure-menu-item">
              <NavLink to="/kana" className="pure-menu-link">Kana</NavLink>
            </li>
            <li className="pure-menu-item">
            </li>
          </ul>
        </div>
      </nav>

      <div className="content">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/sudoku" element={<Sudoku />} />
          <Route path="/kana" element={<Kana />} />
          <Route path="/kana/test" element={<KanaTest />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
