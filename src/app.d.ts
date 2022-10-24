/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
  // interface Locals {}
  // interface Platform {}
  // interface Session {}
  // interface Stuff {}
}

declare module '*&Image' {
  export type Srcset = { srcset: string; type: string }

  export type Source = {
    sources: Srcset[]
    placeholder: string
    alt: string
    aspect?: number
  }

  const image: Source

  export default image
}

type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T

declare const tailwindcss: {
  readonly config: import('tailwindcss').Config & {
    theme: DeepPartial<import('tailwindcss/types/generated/default-theme').DefaultTheme>
  }
}
