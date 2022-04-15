<script lang="ts">
  import '../app.css'
  import Footer from './_Footer.svelte'
  import Navbar from './_Navbar.svelte'

  type Title = { text: string; href?: string }
  type Dropdown = { text: string; href: string }[]
  type NavbarItem = { title: Title; dropdown?: Dropdown }

  const navbarItems: NavbarItem[] = [
    {
      title: {
        text: 'Lore',
      },
      dropdown: [
        {
          text: 'Krönikor',
          href: '/krönikor',
        },
        {
          text: 'Gamla sidan',
          href: '/gamla-sidan.html',
        },
      ],
    },
    {
      title: {
        text: 'Bra att ha',
      },
      dropdown: [
        {
          text: 'Sittningslokaler',
          href: '/sittningslokaler',
        },
        {
          text: 'Röstsystem',
          href: '/röstsystem',
        },
        {
          text: 'Hårddisk',
          href: '/hårddisk',
        },
      ],
    },
    {
      title: {
        text: 'Sittningslokaler',
        href: '/sittningslokaler',
      },
    },
  ]
</script>

<div class="min-h-screen flex flex-col">
  <Navbar items={navbarItems}>
    <svelte:fragment slot="title" let:title let:setExpanded>
      {#if 'href' in title}
        <a href={title.href} on:click={() => setExpanded(false)}>{title.text}</a>
      {:else}
        <span>{title.text}</span>
      {/if}
    </svelte:fragment>
    <svelte:fragment slot="dropdown" let:dropdown let:setExpanded>
      {#if dropdown}
        <ul class="text-lg">
          {#each dropdown as subitem}
            <li>
              <a class="hover:underline" href={subitem.href} on:click={() => setExpanded(false)}>{subitem.text}</a>
            </li>
          {/each}
        </ul>
      {/if}
    </svelte:fragment>
  </Navbar>
  <div id="content" class="container mx-auto p-2 pb-8 lg:pl-0 lg:pr-0 flex-grow">
    <slot />
  </div>
  <Footer />
</div>

<style lang="postcss">
  #content :global(a) {
    @apply underline;
    @apply text-gray-800;
  }

  #content :global(h1) {
    @apply text-3xl;
    @apply font-bold;
    @apply mt-6;
    @apply mb-6;
  }

  #content :global(h2) {
    @apply text-2xl;
    @apply font-bold;
    @apply mt-4;
    @apply mb-4;
  }

  #content :global(p) {
    @apply mt-4;
    @apply mb-4;
  }

  #content :global(ul) {
    @apply list-disc;
  }

  #content :global(ol),
  #content :global(ul) {
    @apply pl-8;
  }

  #content :global(ol) {
    @apply list-decimal;
  }

  #content :global(ol ol) {
    @apply list-lower-latin;
  }

  #content :global(table) {
    @apply overflow-x-auto;
    @apply block;
    @apply mx-auto;
  }

  #content :global(table) :global(tbody) :global(tr:nth-of-type(2n - 1)) {
    @apply bg-gray-100;
  }

  #content :global(td),
  #content :global(th) {
    text-align: inherit;
    @apply p-2;
  }

  #content :global(blockquote) {
    @apply mt-4;
    @apply mb-4;
    @apply pl-4;
    @apply pr-4;
    @apply bg-gray-100;
    @apply text-gray-800;
    @apply rounded;
  }
</style>
