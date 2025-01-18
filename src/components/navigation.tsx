import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import I18N from "./i18n";

const Navigation: React.FC = () => {
  const { i18n } = useTranslation();
  
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

        .container {
          padding: 0;
          position: relative;
        }

        .i18n-select {
          position: absolute;
          right: 0;
          top: 0;
          height: 100%;
        }

        .i18n-select.pure-form select {
          padding: 0 3px;
          height: calc(100% - 6px);
          margin: 3px;
          border-radius: 0;
          box-shadow: none;
          font-size: var(--size-h5);
          min-width: 160px;
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
        <div className="i18n-select pure-form">
          <select
            onChange={(event) => i18n.changeLanguage(event.target.value)}
            value={i18n.language}
          >
            <option value="en"><I18N>nav.languages.en</I18N></option>
            <option value="jp"><I18N>nav.languages.jp</I18N></option>
            <option value="nl"><I18N>nav.languages.nl</I18N></option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;