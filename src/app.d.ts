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
  export const sources: { srcset: string; type: string }[]
  export const placeholder: string
  export const alt: string
}

declare module '*?Image' {
  export const sources: { srcset: string; type: string }[]
  export const placeholder: string
  export const alt: string
}

type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T

declare const tailwindcss: {
  readonly config: import('tailwindcss/tailwind-config').TailwindConfig &
    DeepPartial<import('tailwindcss/tailwind-config-default').TailwindConfigDefault>
}
