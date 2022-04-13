<script lang="ts">
	import { slide } from 'svelte/transition';

	type T = $$Generic;
	type $$Slots = {
		title: { item: T };
		dropdown: { item: T };
	};

	export let items: T[] = [];
	export let selected: number[] = [];
	export let expanded: boolean = false;

	const theme = tailwindcss.config.theme;
	const transDuration = Number(theme.transitionDuration?.DEFAULT?.slice(0, -2)) || 0;
	const md = Number(theme.screens?.md?.slice(0, -2)) || 0;

	let windowWidth: number = 0;
	let mdScreen: boolean;
	$: mdScreen = windowWidth >= md;
	$: if (mdScreen && selected.length > 0) {
		selected = [selected[0]];
	}

	let navWidth: number = 0;
	let titles: HTMLElement[] = [];
	let dropdowns: HTMLElement[] = [];
	let lefts: number[] = [];
	$: for (let i = 0; i < items.length; i++) {
		if (!titles[i] || !dropdowns[i]) {
			continue;
		}

		const dropdownBox = dropdowns[i].getBoundingClientRect();
		const titleBox = titles[i].getBoundingClientRect();

		const preferredL = titleBox.x + (titleBox.width - dropdownBox.width) / 2;
		lefts[i] = Math.max(0, Math.min(preferredL, navWidth - dropdownBox.width));
	}

	function setSelected(i: number, value: boolean) {
		const idx = selected.indexOf(i);
		if (idx < 0 && value) {
			if (mdScreen) {
				selected = [i];
			} else {
				selected = [...selected, i];
			}
		} else if (i >= 0 && !value) {
			selected.splice(idx, 1);
			selected = selected;
		}
	}

	function toggleSelected(i: number) {
		setSelected(i, !selected.includes(i));
	}

	function toggleExpanded() {
		if (expanded) {
			expanded = false;
		} else {
			selected = [];
			expanded = true;
		}
	}
</script>

<svelte:window bind:innerWidth={windowWidth} />
<nav class="bg-gray-300 md:relative" bind:clientWidth={navWidth}>
	<div class="md:container md:mx-auto md:flex">
		<div class="flex items-center md:flex-grow">
			<div class="flex-grow m-2 md:ml-0 font-pixel font-bold">
				<a href="/">
					<span class="text-5xl">255</span><span class="text-2xl">.se</span>
				</a>
			</div>
			<svg
				on:click={toggleExpanded}
				class="w-6 m-4 md:mr-0 cursor-pointer md:hidden"
				version="1.1"
				viewBox="0 0 5 5"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect width="5" height="1" />
				<rect y="2" width="5" height="1" />
				<rect y="4" width="5" height="1" />
			</svg>
		</div>
		{#if expanded || mdScreen}
			<ul
				class="p-2 bg-gray-100 md:bg-transparent flex flex-col md:flex-row md:items-center gap-2 md:gap-4"
				transition:slide={{ duration: mdScreen ? 0 : transDuration }}
			>
				{#each items as item, i}
					<li
						on:mouseenter={() => mdScreen && setSelected(i, true)}
						on:mouseleave={() => mdScreen && setSelected(i, false)}
					>
						<div
							on:click={() => !mdScreen && toggleSelected(i)}
							class="cursor-pointer group font-pixel font-bold"
						>
							<div class="w-fit" bind:this={titles[i]}>
								<slot name="title" {item} />
								<div
									class={`h-1 bg-gray-300 md:bg-gray-400 ${
										selected.includes(i) ? 'w-full' : 'w-0'
									} group-hover:w-full transition-[width] m-auto`}
								/>
							</div>
						</div>
						<!-- This is a dummy element used to get the width of the dropdown content -->
						<div class="w-0 h-0 overflow-hidden absolute invisible">
							<div
								style={`max-width: ${navWidth}px`}
								class="absolute w-max"
								bind:this={dropdowns[i]}
							>
								<div class="md:m-3 pl-2 bg-gray-100 md:p-2">
									<slot name="dropdown" {item} />
								</div>
							</div>
						</div>
						{#if selected.includes(i)}
							<div
								style={`max-width: ${navWidth}px; left: ${lefts[i] || 0}px`}
								class="md:absolute"
								transition:slide
							>
								<div class="md:m-3 pl-2 bg-gray-100 md:p-2">
									<slot name="dropdown" {item} />
								</div>
							</div>
						{/if}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</nav>
