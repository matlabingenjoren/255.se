<script lang="ts">
  export let src: import('&Image').Source | `${string}.svg`
  export let alt: string | undefined = undefined

  let clazz: string | undefined = undefined
  export { clazz as class }

  let source: import('&Image').Source
  $: source =
    typeof src === 'string'
      ? {
          alt: src,
          placeholder: src,
          sources: [],
        }
      : src

  let img: HTMLImageElement
  let loaded = false
  $: loaded ||= source?.sources?.length === 0 || (img && img.complete && img.naturalWidth > 0)
</script>

<div class={clazz} style={'position: relative' + (source.aspect ? `; aspect-ratio: ${source.aspect}` : '')}>
  <div
    class="overflow-hidden z-10 relative w-full h-full bg-gray-100 transition-opacity {loaded
      ? 'opacity-0'
      : 'opacity-100'}"
  >
    <img class="w-full h-full object-cover blur-lg" src={source.placeholder} alt={alt || source.alt} />
  </div>
  <picture class="absolute top-0 left-0 w-full h-full">
    {#each source.sources as imgSrc}
      <source {...imgSrc} />
    {/each}
    <img
      class="w-full h-full object-cover"
      bind:this={img}
      src={source.placeholder}
      alt={alt || source.alt}
      loading="lazy"
      on:load={() => (loaded = true)}
    />
  </picture>
</div>
