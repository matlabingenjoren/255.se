<script>
  export let title = '255.se'
  export let keywords = ''
</script>

<svelte:head>
  <title>{title}</title>
  <meta
    name="keywords"
    content={[keywords, '255 chalmers faddergrupp fysik fysikteknologsektionen ftek mottagning']
      .filter(Boolean)
      .join(' ')}
  />
</svelte:head>
<slot />
