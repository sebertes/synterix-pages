<script>
    import {page} from "$app/state";
    import ItemIcon from "components/icons/ItemIcon.svelte";
    import PopupPic from "components/PopupPic.svelte";

    let {data} = $props();
    let menus = $state([]);
    let topics = $derived.by(() => {
        let t = data.page.url.split('/');
        t[0] = 'Synterix';
        if (t.length > 2) {
            t.pop();
        }
        return t;
    });
    let showPopup = $state(false);
    let popupParams = $state(null);
    let hash = $derived(page.url.hash);
    let content;

    function openPopup(url) {
        popupParams = {url};
        showPopup = true;
    }

    $effect(() => {
        if (page.url.pathname) {
            document.querySelectorAll('img').forEach(element => {
                element.onclick = () => {
                    openPopup(element.src);
                }
            })
        }
    })

    $effect(() => {
        let _menus = [];
        if (page.url.pathname) {
            content.querySelectorAll('h2').forEach(h2 => {
                let text = h2.innerText.replace(/\s+/g, '-').toLowerCase();
                let hash = encodeURIComponent(text);
                _menus.push({
                    id: text,
                    url: `#${hash}`
                });
                h2.innerHTML = `<a style="scroll-margin-top: 50px;" data-name="${text}" href="#${hash}">${h2.innerHTML}</a>`;
            });
            menus = _menus;
        }
    });
    $effect(() => {
        if (hash) {
            let el = document.querySelector(`[data-name="${decodeURIComponent(hash.substring(1))}"]`);
            if (el) {
                el.scrollIntoView({
                    behavior: 'smooth',
                    top: 50
                });
            }
        }
    })
</script>
<div class="doc-body"></div>
<div class="left">
    <div class="items-menu">
        <ItemIcon/>
    </div>
    <div class="items-list">
        {#each data.tree as item}
            <div class="title">
                <a href={'/'+item.lang+item.url}
                   class={[page.url.pathname===('/'+item.lang+item.url)&&'active']}>{item.title}</a>
            </div>
            <div class="subs">
                {#each item.children as sub}
                    <div class="sub">
                        <a href={'/'+sub.lang+sub.url}
                           class={[page.url.pathname===('/'+sub.lang+sub.url)&&'active']}>{sub.title}</a>
                    </div>
                {/each}
            </div>
        {/each}
    </div>
</div>
<div class="right">
    <div class="content" bind:this={content}>
        <div class="top">
            <div class="top-paths">
                {#each topics as path}
                    <div class="top-path">{path}</div>
                {/each}
            </div>
            <div class="top-title">{data.page.title}</div>
        </div>
        <div class="inner">
            {@html data.page.html}
        </div>
        <div class="bottom">
            <div class="prev">
                {#if data.page.prev}
                    <div class="nav-label">previous</div>
                    <a href={'/'+data.page.prev.lang+data.page.prev.url}>{data.page.prev.title}</a>
                {/if}
            </div>
            <div class="next">
                {#if data.page.next}
                    <div class="nav-label">next</div>
                    <a href={'/'+data.page.next.lang+data.page.next.url}>{data.page.next.title}</a>
                {/if}
            </div>
        </div>
    </div>
    <div class="menu">
        <div class="menu-title">On This Page</div>
        {#each menus as item}
            <div class="menu-item">
                <a href={item.url} class={[page.url.pathname===item.url&&'active']}>{item.id}</a>
            </div>
        {/each}
    </div>
</div>
{#if showPopup}
    <PopupPic {...popupParams} onClose={()=>showPopup=false}/>
{/if}

<style lang="scss">
  .doc-body {
    background: $surface;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .left {
    position: fixed;
    top: 50px;
    left: 0;
    z-index: 999;
    bottom: 0;

    .items-menu {
      display: none;
    }

    .items-list {
      width: 300px;
      padding: 35px 0 50px 100px;
      background-color: $surfaceContainerLowest;
      overflow: auto;
      box-sizing: border-box;
      z-index: 3;
      height: 100%;

      .title {
        line-height: 40px;

        a {
          font-size: 18px;
          color: $onSurface;

          &.active {
            color: $info;
          }
        }
      }

      .subs {
        margin-left: 5px;
        margin-bottom: 10px;

        .sub {
          line-height: 25px;

          a {
            color: $onSurface;

            &.active {
              color: $info;
            }
          }
        }
      }
    }
  }

  .right {
    padding: 0 400px 0 300px;
    width: 100%;
    margin-top: 50px;
    position: relative;

    .content {
      padding: 20px 80px 50px 80px;
      box-sizing: border-box;
    }

    .menu {
      position: fixed;
      top: 50px;
      left: calc((300px + (100% - 300px - 400px)));
      padding: 30px 0 0 0;
      line-height: 25px;

      .menu-title {
        line-height: 40px;
        font-size: 18px;
      }
    }
  }

  .top {
    margin-top: 20px;
    margin-bottom: 30px;

    .top-paths {
      display: flex;
      font-size: 12px;

      .top-path {
        padding: 0 20px 0 0;
        color: $outline;
        position: relative;

        &:first-child {
          &::after {
            content: "";
            display: block;
            background-color: $outline;
            width: 5px;
            height: 5px;
            border-radius: 5px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 100%;
            margin-left: -13px;
          }
        }
      }
    }

    .top-title {
      line-height: 50px;
      font-size: 22px;
    }
  }

  .bottom {
    display: flex;
    border-top: 1px solid $outlineVariant;
    margin: 50px 0 5px 0;

    .nav-label {
      line-height: 40px;
      font-size: 20px;
      margin-bottom: 10px;
    }

    .prev {
      flex: 1;
    }

    .next {
      .nav-label {
        text-align: right;
      }
    }
  }

  @media screen and (min-width: 480px) and (max-width: 1200px) {
    .left {
      .items-list {
        padding: 30px 0 50px 20px;
        width: 200px;
      }
    }
    .right {
      padding: 0 0 50px 200px;

      .content {
        width: 100%;
      }

      .menu {
        display: none;
      }
    }
  }

  @media screen and (max-width: 480px) {
    .left {
      .items-menu {
        display: block;
        line-height: 50px;
        text-align: center;
        width: 50px;
        font-size: 20px;
        margin-top: 2px;
      }

      .items-list {
        width: 200px;
        padding: 30px 0 50px 20px;
        display: none;
        position: fixed;
        top: 50px;
        left: 0;
        bottom: 0;
        @include elevation(4);
      }

      &:hover {
        .items-list {
          display: block;
        }
      }
    }
    .right {
      padding: 0 20px 50px 20px;
      width: auto;

      .content {
        width: auto;
        padding: 0 25px 0 25px;

        .top {
          margin-top: 70px;
        }
      }

      .menu {
        display: none;
      }
    }
  }
</style>