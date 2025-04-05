<script>
    import {getProgress} from "components/Progress.svelte.js";

    let visible = $derived.by(() => {
        let progress = getProgress();
        return progress > 0 && progress < 100 || progress === 100;
    });
</script>

{#if visible}
    <div class="progress-bar" style="width: {getProgress()}%;opacity: {getProgress() === 100 ? 0 : 1};"></div>
{/if}

<style lang="scss">
  .progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    width: 0%;
    //background: linear-gradient(to right, #4ade80, #38bdf8);
    background-color: $infoColor;
    transition: width 0.2s ease, opacity 0.3s ease;
    z-index: 999999999;
    pointer-events: none;
  }
</style>