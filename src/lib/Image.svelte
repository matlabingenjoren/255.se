<script lang="ts">
  export let src: {
    sources: { srcset: string; type: string }[]
    placeholder: string
    alt: string
  }

  export let alt: string | undefined = undefined

  let clazz: string | undefined = undefined
  export { clazz as class }

  let loadad = false
</script>

<div class={`relative ${clazz || ''}`}>
  <div
    class={`overflow-hidden z-10 relative w-full h-full bg-gray-400 transition-opacity ${
      loadad ? 'opacity-0' : 'opacity-100'
    }`}
  >
    <img class="w-full h-full blur-lg" src={src.placeholder} alt={alt || src.alt} />
  </div>
  <picture class="absolute top-0 left-0 w-full h-full">
    {#each src.sources as imgSrc}
      <source {...imgSrc} />
    {/each}
    <img src={src.placeholder} alt={alt || src.alt} loading="lazy" on:load={() => (loadad = true)} />
  </picture>
</div>
