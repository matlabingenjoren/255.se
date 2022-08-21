<script lang="ts">
  export let src: import('&Image').Source
  export let alt: string | undefined = undefined

  let clazz: string | undefined = undefined
  export { clazz as class }

  let img: HTMLImageElement
  let loaded = false
  $: loaded ||= img && img.complete && img.naturalWidth > 0
</script>

<div class={clazz} style="position: relative; aspect-ratio: {src.aspect}">
  <div
    class="overflow-hidden z-10 relative w-full h-full bg-gray-400 transition-opacity {loaded
      ? 'opacity-0'
      : 'opacity-100'}"
  >
    <img class="w-full h-full object-cover blur-lg" src={src.placeholder} alt={alt || src.alt} />
  </div>
  <picture class="absolute top-0 left-0 w-full h-full">
    {#each src.sources as imgSrc}
      <source {...imgSrc} />
    {/each}
    <img
      class="w-full h-full object-cover"
      bind:this={img}
      src={src.placeholder}
      alt={alt || src.alt}
      loading="lazy"
      on:load={() => (loaded = true)}
    />
  </picture>
</div>
