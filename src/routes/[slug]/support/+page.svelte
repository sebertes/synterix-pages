<script>
    import DevIcon from "components/icons/DevIcon.svelte";
    import SponsorsIcon from "components/icons/SponsorsIcon.svelte";
    import CoffeeIcon from "components/icons/CoffeeIcon.svelte";
    import QaIcon from "components/icons/QaIcon.svelte";
    import WechatIcon from "components/icons/WechatIcon.svelte";
    import WechatPayIcon from "components/icons/WechatPayIcon.svelte";
    import AlipayIcon from "components/icons/AlipayIcon.svelte";
    import Welcome2 from "components/images/Welcome2.svelte";
    import DesignIcon from "components/icons/DesignIcon.svelte";
    import CombinIcon from "components/icons/CombinIcon.svelte";
    import PerformIcon from "components/icons/PerformIcon.svelte";
    import DiscordIcon from "components/icons/DiscordIcon.svelte";
    import OpencollectiveIcon from "components/icons/OpencollectiveIcon.svelte";
    import PopupPic from "components/PopupPic.svelte";

    let {data} = $props();
    let showPopup = $state(false);
    let popupParams = $state(null);

    function openPopup(url) {
        popupParams = {url};
        showPopup = true;
    }
</script>
<div class="section part-0">
    <div class="head-banner">
        <div class="head-banner-left">
            <div class="header-banner-inner">
                <div class="title">{data.keys.key_12}</div>
                <div class="desc">{data.keys.key_13}</div>
            </div>
        </div>
        <div class="head-banner-right">
            <Welcome2/>
        </div>
    </div>
</div>
<div class="section part-1">
    <div class="content">
        <div class="title">
            <div class="image">
                <DevIcon/>
            </div>
            <div class="text">{data.keys.key_14}</div>
        </div>
        <div class="desc">{data.keys.key_15}</div>
        <div class="channel">
            <div class="item">
                <div class="brand">
                    <DesignIcon/>
                </div>
                <div class="brand-desc">{data.keys.key_16}</div>
            </div>
            <div class="item">
                <div class="brand">
                    <CombinIcon/>
                </div>
                <div class="brand-desc">{data.keys.key_17}</div>
            </div>
            <div class="item">
                <div class="brand">
                    <PerformIcon/>
                </div>
                <div class="brand-desc">{data.keys.key_18}</div>
            </div>
        </div>
    </div>
</div>
<div class="section part-2">
    <div class="content">
        <div class="title">
            <div class="image">
                <SponsorsIcon/>
            </div>
            <div class="text">{data.keys.key_19}</div>
        </div>
        <div class="desc">{data.keys.key_20}</div>
        <div class="channel">
            <div class="item">
                <div class="brand">
                    <OpencollectiveIcon/>
                </div>
                <a href="https://opencollective.com/sebertes" target="_blank" class="brand-desc">Open Collective</a>
            </div>
        </div>
    </div>
</div>
<div class="section part-3">
    <div class="content">
        <div class="title">
            <div class="image">
                <CoffeeIcon/>
            </div>
            <div class="text">{data.keys.key_21}</div>
        </div>
        <div class="desc">{data.keys.key_22}</div>
        <div class="channel">
            <div class="item">
                <div class="brand">
                    <OpencollectiveIcon/>
                </div>
                <a href="https://opencollective.com/sebertes" target="_blank" class="brand-desc">Open Collective</a>
            </div>
            <div class="item">
                <div class="brand">
                    <WechatPayIcon/>
                </div>
                <button class="dived linkable brand-desc"
                        onclick={()=>openPopup("/images/pic_a.png")}>{data.keys.key_23}</button>
            </div>
        </div>
    </div>
</div>
<div class="section part-4">
    <div class="content">
        <div class="title">
            <div class="image">
                <QaIcon/>
            </div>
            <div class="text">{data.keys.key_25}</div>
        </div>
        <div class="desc">{data.keys.key_26}</div>
        <div class="channel">
            <div class="item">
                <div class="brand">
                    <WechatIcon/>
                </div>
                <button class="dived linkable brand-desc"
                        onclick={()=>openPopup("/images/pic_b.png")}>{data.keys.key_27}</button>
            </div>
            <div class="item">
                <div class="brand">
                    <DiscordIcon/>
                </div>
                <a href="https://discord.gg/fyzZSDeR" target="_blank" class="brand-desc">Discord</a>
            </div>
        </div>
    </div>
</div>
<section class="footer">
    <div class="footer-body">
        <div class="footer-content">
            © 2025 Sebertes. Synterix is free and open source software released under the MIT license.
        </div>
    </div>
</section>
{#if showPopup}
    <PopupPic {...popupParams} onClose={()=>showPopup=false}/>
{/if}

<style lang="scss">
  .section {
    &.part-0 {
      margin-top: 50px;
      background-color: $infoColorContainer;
    }

    &.part-1 {
      background-color: $surface;
    }

    &.part-2 {
      background-color: $surfaceContainerLow;
    }

    &.part-3 {
      background-color: $surface;
    }

    &.part-4 {
      background-color: $surfaceContainerLow;
    }
  }

  .head-banner {
    max-width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    padding: 40px 0 40px 0;
    position: relative;

    .head-banner-left {
      position: relative;
      z-index: 1000;

      .header-banner-inner {
        padding-left: 20px;
      }

      .title {
        font-size: 25px;
        line-height: 40px;
      }

      .desc {
        font-size: 18px;
      }
    }

    .head-banner-right {
      position: absolute;
      right: 0;
      top: 50px;
      width: 35%;
      margin-top: -90px;
      transform: rotate(-30deg);
    }
  }

  .content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 30px 20px 30px 20px;

    .title {
      display: flex;
      line-height: 50px;

      .image {
        width: 30px;
        text-align: center;
        font-size: 25px;
      }

      .text {
        font-size: 20px;
        font-weight: bold;
      }
    }

    .desc {
      font-size: 16px;
      margin-left: 30px;
    }

    .channel {
      line-height: 40px;
      margin-left: 30px;
      margin-top: 20px;

      .item {
        display: flex;

        .brand {
          width: 30px;
          font-size: 20px;
        }

        .brand-desc {
          font-size: 16px;
        }
      }
    }
  }

  .footer {
    background-color: $surfaceContainerLow;

    .footer-body {
      width: 1200px;
      margin: 0 auto;
      padding: 40px 20px 40px 20px;

      .footer-content {
        text-align: center;
      }
    }
  }

  @media screen and (max-width: 1200px) {
    .head-banner {
      .head-banner-right {
        width: 40%;
        margin-top: 0px;
        right: -10px;
        top: 0;
        transform: rotate(-30deg);
      }
    }
    .content {
      width: 100%;
      box-sizing: border-box;
    }
    .footer {
      .footer-body {
        width: 100%;
        box-sizing: border-box;
      }
    }
  }

  @media screen and (max-width: 480px) {
    .head-banner {
      .head-banner-right {
        width: 70%;
        margin-top: 0px;
        right: -10px;
        top: 0;
        transform: rotate(-30deg);
      }
    }
  }

</style>