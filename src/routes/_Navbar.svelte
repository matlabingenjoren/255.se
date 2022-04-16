<script lang="ts">
  import { slide } from 'svelte/transition'

  type Title = $$Generic
  type Dropdown = $$Generic
  type Item = { title: Title; dropdown?: Dropdown }
  type SlotProps = Item & { setExpanded(value: boolean): void }
  type $$Slots = {
    title: SlotProps
    dropdown: SlotProps
  }

  export let items: Item[] = []
  export let selected: number[] = []
  export let expanded = false

  const theme = tailwindcss.config.theme
  const transDuration = Number(theme.transitionDuration?.DEFAULT?.slice(0, -2)) || 0
  const lg = Number(theme.screens?.lg?.slice(0, -2)) || 0

  let windowWidth = 0
  let lgScreen: boolean
  $: lgScreen = windowWidth >= lg
  $: if (lgScreen && selected.length > 0) {
    selected = [selected[0]]
  }

  let navWidth = 0
  let titles: HTMLElement[] = []
  let dropdowns: HTMLElement[] = []
  let lefts: number[] = []
  $: for (let i = 0; i < items.length; i++) {
    if (!titles[i] || !dropdowns[i]) {
      continue
    }

    const dropdownBox = dropdowns[i].getBoundingClientRect()
    const titleBox = titles[i].getBoundingClientRect()

    const preferredL = titleBox.x + (titleBox.width - dropdownBox.width) / 2
    lefts[i] = Math.max(0, Math.min(preferredL, navWidth - dropdownBox.width))
  }

  function setSelected(i: number, value: boolean) {
    const idx = selected.indexOf(i)
    if (idx < 0 && value && items[i]?.dropdown !== undefined) {
      if (lgScreen) {
        selected = [i]
      } else {
        selected = [...selected, i]
      }
    } else if (i >= 0 && !value) {
      selected.splice(idx, 1)
      selected = selected
    }
  }

  function toggleSelected(i: number) {
    setSelected(i, !selected.includes(i))
  }

  function setExpanded(value: boolean) {
    expanded = value
    if (value) {
      selected = []
    }
  }

  function toggleExpanded() {
    setExpanded(!expanded)
  }
</script>

<svelte:window bind:innerWidth={windowWidth} />
<nav class="bg-gray-300 lg:relative" bind:clientWidth={navWidth}>
  <div class="lg:container lg:mx-auto lg:flex">
    <div class="flex items-center lg:flex-grow">
      <div class="flex-grow m-2 lg:ml-0 font-pixel font-bold">
        <a href="/" sveltekit:prefetch>
          <span class="text-5xl">255</span><span class="text-2xl">.se</span>
        </a>
      </div>
      <svg
        on:click={toggleExpanded}
        class="w-6 m-4 lg:mr-0 cursor-pointer lg:hidden"
        version="1.1"
        viewBox="0 0 5 5"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="5" height="1" />
        <rect y="2" width="5" height="1" />
        <rect y="4" width="5" height="1" />
      </svg>
    </div>
    {#if expanded || lgScreen}
      <ul
        class="p-2 bg-gray-100 lg:bg-transparent flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4"
        transition:slide={{ duration: lgScreen ? 0 : transDuration }}
      >
        {#each items as item, i}
          <li
            on:mouseenter={() => lgScreen && setSelected(i, true)}
            on:mouseleave={() => lgScreen && setSelected(i, false)}
          >
            <div on:click={() => !lgScreen && toggleSelected(i)} class="cursor-pointer group font-pixel font-bold">
              <div class="w-fit" bind:this={titles[i]}>
                <slot name="title" {...item} {setExpanded} />
                <div
                  class={`h-1 bg-gray-300 lg:bg-gray-400 ${
                    selected.includes(i) ? 'w-full' : 'w-0'
                  } group-hover:w-full transition-[width] m-auto`}
                />
              </div>
            </div>
            <!-- This is a dummy element used to get the width of the dropdown content -->
            <div class="w-0 h-0 overflow-hidden absolute invisible">
              <div style={`max-width: ${navWidth}px`} class="absolute w-max" bind:this={dropdowns[i]}>
                <div
                  class="lg:m-3 pl-2 bg-gray-100 lg:p-4 shadow-none lg:shadow-lg lg:before:content-[''] lg:before:w-4 lg:before:h-4 lg:before:absolute lg:before:top-2 lg:before:left-1/2 lg:before:bg-gray-100 lg:before:rotate-45 lg:before:-translate-x-1/2 lg:before:-z-10"
                >
                  <slot name="dropdown" {...item} {setExpanded} />
                </div>
              </div>
            </div>
            {#if selected.includes(i)}
              <div
                style={`max-width: ${navWidth}px; left: ${lefts[i] || 0}px`}
                class="lg:absolute lg:z-10"
                transition:slide
              >
                <div
                  class="lg:m-3 pl-2 bg-gray-100 lg:p-4 shadow-none lg:shadow-lg lg:before:content-[''] lg:before:w-4 lg:before:h-4 lg:before:absolute lg:before:top-2 lg:before:left-1/2 lg:before:bg-gray-100 lg:before:rotate-45 lg:before:-translate-x-1/2 lg:before:-z-10"
                >
                  <slot name="dropdown" {...item} {setExpanded} />
                </div>
              </div>
            {/if}
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</nav>
