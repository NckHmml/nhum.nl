import i18n from "i18next";
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
  .init({
    resources: i18nJson,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    react: { 
      transKeepBasicHtmlNodesFor: ["ruby", "rp", "rt", "br", "strong", "i", "p"]
    }
  });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
