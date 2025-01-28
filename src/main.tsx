import i18n from "i18next";
import languageDetector from "i18next-browser-languagedetector";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router";
import { initReactI18next } from "react-i18next";
import "./index.css";
import "purecss";

import * as i18nJson from "./i18n.json";

import App from "./app.tsx";

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    resources: i18nJson,
    supportedLngs: ["en", "de", "nl", "ja"],
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
      skipOnVariables: false,
    },
    react: { 
      transKeepBasicHtmlNodesFor: ["ruby", "rp", "rt", "br", "strong", "i", "p", "sub", "sup", "h1", "h2", "h3", "h4", "h5", "ul", "li"]
    },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "i18next",
      lookupFromPathIndex: 0,
      caches: ["localStorage"],
    },
  });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
