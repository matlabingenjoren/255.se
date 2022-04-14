<script lang="ts">
	import '../app.css';

	import Navbar from './_Navbar.svelte';

	type NavbarItem =
		| { text: string; href: string }
		| { text: string; dropdown: { text: string; href: string }[] };

	const navbarItems: NavbarItem[] = [
		{
			text: 'Sittningslokaler',
			dropdown: [
				{
					text: 'Sittningslokaler',
					href: '/'
				}
			]
		},
		{
			text: 'Övrigt',
			dropdown: [
				{
					text: 'Sittningslokaler',
					href: '/'
				}
			]
		},
		{
			text: 'Övrigt',
			dropdown: [
				{
					text: 'Sittningslokaler',
					href: '/'
				}
			]
		},
		{
			text: 'Övrigt',
			dropdown: [
				{
					text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					href: '/'
				}
			]
		},
		{
			text: 'Övrigt',
			dropdown: [
				{
					text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					href: '/'
				}
			]
		},
		{
			text: 'Övrigt',
			dropdown: [
				{
					text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					href: '/'
				}
			]
		}
	];
</script>

<Navbar items={navbarItems}>
	<svelte:fragment slot="title" let:item>
		{#if 'href' in item}
			<a href={item.href}>{item.text}</a>
		{:else}
			<span>{item.text}</span>
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="dropdown" let:item>
		{#if 'dropdown' in item}
			<ul>
				{#each item.dropdown as subitem}
					<li><a href={subitem.href}>{subitem.text}</a></li>
				{/each}
			</ul>
		{/if}
	</svelte:fragment>
</Navbar>
<div class="container mx-auto p-2">
	<slot />
</div>
