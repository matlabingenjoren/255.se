<script type="ts" context="module">
  import type { Load } from '@sveltejs/kit'

  type LoadProps = Pick<Parameters<Load>[0], 'status' | 'url'>
  export const load: Load = ({ status, url }) => ({ props: { status, url } as LoadProps })
</script>

<script type="ts">
  export let status: LoadProps['status']
  export let url: LoadProps['url']

  // we don't want to use <svelte:window bind:online> here, because we only care about the online state when the page
  // first loads
  const online = typeof navigator !== 'undefined' ? navigator.onLine : true
</script>

<svelte:head>
  <title>{status}</title>
</svelte:head>
{#if online}
  <h1>{status}</h1>
  <p>
    {#if status === 404}
      Sidan {url.pathname} finns inte.
    {:else}
      Ett {status}-fel inträffade.
    {/if}
  </p>
{:else}
  <h1>Det verkar som att du är offline</h1>
  <p>Ladda om sidan när du har återanslutit till internet.</p>
{/if}
