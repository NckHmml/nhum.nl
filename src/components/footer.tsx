import { useTranslation } from "react-i18next";
import I18N from "./i18n";

const Footer: React.FC = () => {
  const { i18n } = useTranslation();
  
  return (
    <footer className="pure-menu pure-menu-horizontal">
      <style jsx>{`
        footer {
          box-sizing: border-box;
          position: sticky;
          bottom: 0;
        }

        .container {
          padding: 0;
          position: relative;
          background-color: var(--color-white);
          height: 2em;
          box-shadow: 0 0 1em var(--color-shadow);
        }

        .i18n-select {
          position: absolute;
          right: 0;
          top: 0;
          height: 100%;
          font-size: var(--size-h5);
          text-transform: uppercase;
        }

        .i18n-select.pure-form select {
          padding: 0 3px;
          height: calc(100% - 6px);
          margin: 3px;
          border-radius: 0;
          box-shadow: none;
          min-width: 160px;
        }

        .i18n-select.pure-form label {
          vertical-align: middle;
          display: initial;
        }
      `}</style>
      <div className="container">
        <div className="i18n-select pure-form">
          <label><I18N>nav.languages.label</I18N></label>
          <select
            onChange={(event) => i18n.changeLanguage(event.target.value)}
            value={i18n.language}
          >
            <option value="en"><I18N>nav.languages.en</I18N></option>
            <option value="ja"><I18N>nav.languages.ja</I18N></option>
            <option value="nl"><I18N>nav.languages.nl</I18N></option>
            <option value="de"><I18N>nav.languages.de</I18N></option>
          </select>
        </div>
      </div>
    </footer>
  );
};

export default Footer;