<script>
    import "../style/global.scss";
    import DayIcon from "components/icons/DayIcon.svelte";
    import NightIcon from "components/icons/NightIcon.svelte";
    import GitIcon from "components/icons/GitIcon.svelte";
    import {page} from "$app/state";
    import MenuIcon from "components/icons/MenuIcon.svelte";
    import 'highlight.js/styles/a11y-dark.css';

    let {children, data} = $props();
    let isDark = $state(true);

    $effect(() => {
        if (isDark) {
            document.body.setAttribute("data-theme", 'dark');
        } else {
            document.body.setAttribute("data-theme", 'light');
        }
    });
</script>

<svelte:head>
    <title>Synterix • {data.page.title}</title>
    <meta name="description" content="Synterix"/>
    <meta name="twitter:title" content="Synterix"/>
    <meta name="twitter:description" content="Web development for the rest of us"/>
    <meta name="Description" content="Web development for the rest of us"/>
</svelte:head>
<div class="home-header">
    <div class="logo"><a href="/"></a></div>
    <div class="inner">
        <div class="menu">
            <MenuIcon/>
        </div>
        <div class="menu-list">
            {#each data.tree as item}
                <a href={'/'+item.lang+item.url}
                   class={["dived",(page.url.pathname!=='/'&&page.url.pathname.startsWith('/'+item.lang+item.url))&&'active']}>{item.title}</a>
            {/each}
        </div>
    </div>
    <div class="tools">
        <div class="lang-toggle">
            <div class="lang">{data.langInfo.name}</div>
            <div class="lang-list">
                {#each data.langs as lang}
                    <a href={lang.url} class="dived">{lang.name}</a>
                {/each}
            </div>
        </div>
        <a href="https://github.com/sebertes" class="dived tool">
            <GitIcon/>
        </a>
        <button class="dived tool" onclick={()=>isDark=!isDark}>
            {#if isDark}
                <DayIcon/>
            {:else}
                <NightIcon/>
            {/if}
        </button>
    </div>
</div>
{@render children()}

<style lang="scss">
  .home-header {
    height: 50px;
    display: flex;
    background: $surfaceContainerLow;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 999999999;

    .logo {
      width: 150px;
      background-image: $logo;
      background-repeat: no-repeat;
      background-size: auto 26px;
      background-position: center left;
      font-size: 22px;
      margin-left: 50px;

      a {
        display: block;
        height: 50px;
        width: 100%;
      }
    }
  }

  .lang-toggle {
    position: relative;
    display: inline-block;

    .lang {
      line-height: 30px;
      padding: 0 20px 0 20px;
      margin: 10px 0 10px 0;
      box-sizing: border-box;
      border: 1px solid $outlineVariant;
      cursor: default;
      border-radius: 5px;
      background-color: $surfaceContainerLowest;
    }

    .lang-list {
      line-height: 30px;
      position: absolute;
      top: 100%;
      left: 0;
      background-color: $surfaceContainer;
      padding: 10px 0 10px 0;
      border-radius: 5px;
      margin-top: -10px;
      @include elevation(3);
      display: none;

      a {
        display: inline-block;
        padding: 0 20px 0 20px;
        cursor: pointer;

        &:hover {
          color: $primary;
        }
      }
    }

    &:hover {
      .lang-list {
        display: block;
      }
    }
  }

  .inner {
    flex: 1;
    .menu {
      line-height: 50px;
      text-align: center;
      width: 50px;
      font-size: 20px;
      display: none;
    }

    .menu-list {
      flex: 1;

      a {
        line-height: 50px;
        display: inline-block;
        margin-right: 30px;
        font-size: 15px;
        position: relative;

        &:hover {
          text-decoration: none;
          cursor: pointer;
        }

        &.active {
          color: $primary;

          &::after {
            content: "";
            display: block;
            height: 3px;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            margin-top: -3px;
            background: $primary;
          }
        }
      }
    }
  }

  .tools {
    padding-right: 20px;

    .tool {
      text-align: center;
      display: inline-block;
      cursor: pointer;
      line-height: 50px;
      position: relative;
      width: 40px;
      font-size: 19px;

      .inner {
        width: 30px;
        border-radius: 3px;

        &:hover {
          background: $primaryContainer;
        }
      }

      .tip {
        white-space: nowrap;
        position: absolute;
        top: 100%;
        z-index: 9999;
        @include elevation(3);
        padding: 0 15px 0 15px;
        line-height: 35px;
        border-radius: 3px;
        font-size: 13px;
        left: 50%;
        transform: translateX(-50%);
        display: none;
        background-color: $surfaceContainerHigh;
      }

      &:hover .tip {
        display: block;
      }
    }
  }

  @media screen and (max-width: 1200px) {
    .home-header {
      .logo {
        flex: 1;
      }

      .inner {
        position: fixed;
        top: 0;
        left: 0;

        .menu {
          display: block;
        }

        .menu-list {
          background-color: $surfaceContainerLow;
          @include elevation(3);
          padding: 10px 0 10px 0;
          border-radius: 0 0 5px 5px;
          display: none;

          a {
            display: block;
            line-height: 35px;
            padding: 0 40px 0 40px;
            margin: 0;
          }
        }

        &:hover {
          .menu-list {
            display: block;
          }
        }
      }
    }
    .tools {
      padding-right: 0;
    }
  }

</style>