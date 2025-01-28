import SyntaxHighlighter from "react-syntax-highlighter";
import { Link, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

import I18N from "../components/i18n";

export const ConceptsBots: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Link to="/concepts"><I18N>nav.back</I18N></Link>
      <h2><I18N>concepts.bots.title</I18N></h2>
      <p><I18N>concepts.bots.description</I18N></p>
      <p><I18N>concepts.bots.story.0</I18N></p>
      <h3><I18N>concepts.bots.story.1</I18N></h3>
      <p><I18N>concepts.bots.story.2</I18N></p>
      <h3><I18N>concepts.bots.story.3</I18N></h3>
      <p><I18N>concepts.bots.story.4</I18N></p>
      <SyntaxHighlighter language="json" children={t("concepts.bots.story.5")} />
      <p><I18N withHtml>concepts.bots.story.6</I18N></p>

    </>
  );
};

export const ConceptsPassword: React.FC = () => (
  <>
    <Link to="/concepts"><I18N>nav.back</I18N></Link>
    <h2><I18N>concepts.password.title</I18N></h2>
    <p><I18N>concepts.password.description</I18N></p>
    <I18N withHtml>concepts.password.story</I18N>
    <a href="https://xkcd.com/936/" target="_blank">https://xkcd.com/936/</a>
    <a href="https://xkcd.com/936/" target="_blank"><img src="https://imgs.xkcd.com/comics/password_strength.png" alt="XKCD cartoon number 936" /></a>
  </>
);

export const ConceptsSearch: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Link to="/concepts"><I18N>nav.back</I18N></Link>
      <h2><I18N>concepts.search.title</I18N></h2>
      <p><I18N>concepts.search.description</I18N></p>
      <p><I18N withHtml>concepts.search.story.0</I18N></p>
      <SyntaxHighlighter language="json" children={t("concepts.search.story.1")} />
      <p><I18N>concepts.search.story.2</I18N></p>
      <SyntaxHighlighter language="json" children={t("concepts.search.story.3")} />
      <h3><I18N>concepts.search.story.4</I18N></h3>
      <p><I18N>concepts.search.story.5</I18N></p>
    </>
  );
};

export const ConceptsIndex: React.FC = () => (
  <>
    <h2><I18N>concepts.bots.title</I18N></h2>
    <p><I18N>concepts.bots.description</I18N></p>
    <Link to="/concepts/bots"><I18N>concepts.goto</I18N></Link>
    <h2><I18N>concepts.password.title</I18N></h2>
    <p><I18N>concepts.password.description</I18N></p>
    <Link to="/concepts/password"><I18N>concepts.goto</I18N></Link>
    <h2><I18N>concepts.search.title</I18N></h2>
    <p><I18N>concepts.search.description</I18N></p>
    <Link to="/concepts/search"><I18N>concepts.goto</I18N></Link>
  </>
);

export const Concepts: React.FC = () => (
  <>
    <h1><I18N>concepts.title</I18N></h1>
    <p><I18N>concepts.description</I18N></p>
    <Outlet />
  </>
);