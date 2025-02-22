import { useTranslation } from "react-i18next";
import I18N from "./i18n";
import { classNames } from "../helper";

const Footer: React.FC = () => {
  const { i18n } = useTranslation();

  const rootClass = classNames({
    "pure-menu pure-menu-horizontal": true,
    [i18n.language]: true,
  });
  
  return (
    <footer className={rootClass}>
      <style jsx>{`
        footer {
          font-family: Roboto, TakaoPGothic, "sans-serif" !important;
          box-sizing: border-box;
          position: sticky;
          bottom: 0;
          z-index: 1;
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

        .ja .i18n-select {
          font-size: var(--size-h4);
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

        .logo {
          float: left;
          max-height: 2em;
          overflow: hidden;
          cursor: pointer;
        }

        .logo img {
          box-sizing: border-box;
          padding: 4px;
          max-height: 2em;
        }

        @media print {
          footer {
            display: none;
          }

          .container {
            box-shadow: none;
          }
        }
      `}</style>
      <div className="container">
        <span className="logo">
          <a
            href="https://www.linkedin.com/in/nckhmml"
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="outbound-link-click"
            data-umami-event-url="https://www.linkedin.com/in/nckhmml"
          >
            <img src="/assets/LI-In-Bug.png" alt="LinkedIn Logo" />
          </a>
        </span>
        <span className="logo">
          <a
            href="https://github.com/NckHmml"
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="outbound-link-click"
            data-umami-event-url="https://github.com/NckHmml"
          >
            <img src="/assets/github-mark.svg" alt="GitHub Logo" />
          </a>
        </span>
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