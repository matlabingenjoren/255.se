<script type="ts">
  import { page } from '$app/stores'

  // we don't want to use <svelte:window bind:online> here, because we only care about the online state when the page
  // first loads
  const online = typeof navigator !== 'undefined' ? navigator.onLine : true
</script>

<svelte:head>
  <title>{$page.status}</title>
</svelte:head>
{#if online}
  <h1>{$page.status}</h1>
  <p>
    {#if $page.status === 404}
      Sidan {decodeURI($page.url.pathname)} finns inte.
    {:else}
      Ett {$page.status}-fel inträffade.
    {/if}
  </p>
{:else}
  <h1>Det verkar som att du är offline</h1>
  <p>Ladda om sidan när du har återanslutit till internet.</p>
{/if}
