/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly GOOGLE_CALENDAR_URL: string;
  }
}
