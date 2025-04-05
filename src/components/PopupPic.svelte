<script>
    import {fade, fly} from 'svelte/transition';
    import {onMount} from "svelte";

    let {url, alt, onClose} = $props();
    let size = $state({
        width: 100,
        height: 100
    });

    function loadAndDisplayImage(imageUrl, fn) {
        const img = new Image();
        img.onload = function () {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const maxWidth = windowWidth * 0.95;
            const maxHeight = windowHeight * 0.95;
            const originalWidth = this.naturalWidth;
            const originalHeight = this.naturalHeight;
            const aspectRatio = originalWidth / originalHeight;
            let displayWidth, displayHeight;
            if (originalWidth > maxWidth || originalHeight > maxHeight) {
                if (originalWidth / maxWidth > originalHeight / maxHeight) {
                    displayWidth = maxWidth;
                    displayHeight = maxWidth / aspectRatio;
                } else {
                    displayHeight = maxHeight;
                    displayWidth = maxHeight * aspectRatio;
                }
            } else {
                displayWidth = originalWidth;
                displayHeight = originalHeight;
            }
            fn && fn({width: displayWidth, height: displayHeight});
        };
        img.src = imageUrl;
    }

    onMount(() => {
        loadAndDisplayImage(url, (a) => {
            size = a;
        })
    })
</script>

<div class="mask" in:fade out:fade></div>
<div class="image" onclick={onClose}>
    <div class="image-pic" in:fly={{y: 200, duration: 300}} out:fade
         style="width:{size.width}px;height:{size.height}px;background-image: url('{url}')"></div>
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