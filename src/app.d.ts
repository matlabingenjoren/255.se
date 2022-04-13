/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

declare namespace tailwindcss {
	const config: import('tailwindcss/tailwind-config').TailwindConfig &
		DeepPartial<import('tailwindcss/tailwind-config-default').TailwindConfigDefault>;
}
