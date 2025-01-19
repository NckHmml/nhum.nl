import { NavLink } from "react-router-dom";
import I18N from "./i18n";

const Navigation: React.FC = () => {

  return (
    <nav className="pure-menu pure-menu-horizontal">
      <style jsx>{`
        nav {
          position: sticky;
          top: 0;
          z-index: 1;
          border-bottom: 1px solid var(--color-border);
          background-color: var(--color-white);
        }

        nav .container {
          padding: 0;
          position: relative;
        }
      `}</style>
      <div className="container">
        <NavLink to="/" className="pure-menu-heading pure-menu-link"><I18N>nav.home</I18N></NavLink>
        <ul className="pure-menu-list">
          <li className="pure-menu-item">
            <NavLink to="/sudoku" className="pure-menu-link"><I18N>nav.sudoku</I18N></NavLink>
          </li>
          <li className="pure-menu-item">
            <NavLink to="/kana" className="pure-menu-link"><I18N>nav.kana</I18N></NavLink>
          </li>
          <li className="pure-menu-item">
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;