/// <reference types="vite/client" />
/// <reference types="styled-jsx" />

type Dictionary<T> = { [key: string]: T };

interface Umami {
  track: (event: string, properties?: Dictionary) => void;
}

declare const umami: Umami | undefined;