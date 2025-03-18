/// <reference types="vite/client" />
/// <reference types="styled-jsx" />

type Dictionary<T> = { [key: string]: T };

interface Umami {
  track(): Promise<string> | undefined;
  track(
    event_name: string,
    event_data?: Dictionary,
  ): Promise<string> | undefined;
  track(custom_payload: {
    website?: string;
    [key: string]: T;
  }): Promise<string> | undefined;
  track(
    callback: (props: {
      hostname: string;
      language: string;
      referrer: string;
      screen: string;
      title: string;
      url: string;
      website: string;
    }) => { website: string;[key: string]: T },
  ): Promise<string> | undefined;
}

declare const umami: Umami | undefined;
