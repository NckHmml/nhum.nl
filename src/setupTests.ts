import "./vite-env.d.ts";
import "@testing-library/jest-dom/vitest";
import i18n from "i18next";
import languageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { vi } from "vitest";

import * as i18nJson from "./i18n.json";

import.meta.env.MODE = "test";

declare global {
  interface Window {
    $RefreshReg$: () => void;
    $RefreshSig$: () => (type: unknown) => unknown;
    __vite_plugin_react_preamble_installed__: boolean;
    umami: Umami;
  }
}

window.$RefreshReg$ = () => { };
window.$RefreshSig$ = () => (type: unknown) => type;
window.__vite_plugin_react_preamble_installed__ = true;
window.umami = { track: vi.fn() };

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
      transKeepBasicHtmlNodesFor: ["ruby", "rp", "rt", "br", "strong", "i", "p", "sub", "sup", "h1", "h2", "h3", "h4", "h5", "ul", "li"],
    },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "i18next",
      lookupFromPathIndex: 0,
      caches: ["localStorage"],
    },
  });