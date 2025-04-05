<script>
    import {fade, fly} from 'svelte/transition';

    let {url, alt, onClose} = $props();
</script>

<div class="mask" in:fade out:fade></div>
<div class="image" onclick={onClose}>
    <div class="image-pic" in:fly={{y: 200, duration: 300}} out:fade style="background-image: url('{url}')"></div>
</div>

<style lang="scss">
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    z-index: 999999999;
  }

  .image {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999999999;

    .image-pic {
      width: 95%;
      height: 95%;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
</style>