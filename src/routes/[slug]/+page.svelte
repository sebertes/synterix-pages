<script>
    import LoadingBg from "components/images/LoadingBg.svelte";
    import LawIcon from "components/icons/LawIcon.svelte";
    import RocketIcon from "components/icons/RocketIcon.svelte";

    let {data} = $props();
</script>

<section class="banner" style="margin-top: 50px">
    <div class="color"></div>
    <div class="banner-content">
        <div class="left">
            <div class="left-inner">
                <h1 class="h1">{data.keys.key_1}</h1>
                <h3 class="h3">{data.keys.key_2}</h3>
                <a href="/{data.lang}/intro" class="download">
                    <span>{data.keys.key_3}</span>
                    <span><RocketIcon/></span>
                </a>
            </div>
        </div>
        <div class="right">
            <LoadingBg/>
        </div>
    </div>
</section>
<section class="feature">
    <div class="feature-content">
        <div class="feature-item">
            <div class="top">
                <div class="image">
                    <LawIcon/>
                </div>
                <div class="desc"><h3>{data.keys.key_4}</h3></div>
            </div>
            <div class="intro">{data.keys.key_5}</div>
        </div>
        <div class="feature-item">
            <div class="top">
                <div class="image">
                    <LawIcon/>
                </div>
                <div class="desc"><h3>{data.keys.key_6}</h3></div>
            </div>
            <div class="intro">{data.keys.key_7}</div>
        </div>
        <div class="feature-item">
            <div class="top">
                <div class="image">
                    <LawIcon/>
                </div>
                <div class="desc"><h3>{data.keys.key_8}</h3></div>
            </div>
            <div class="intro">{data.keys.key_9}</div>
        </div>
        <div class="feature-item">
            <div class="top">
                <div class="image">
                    <LawIcon/>
                </div>
                <div class="desc"><h3>{data.keys.key_10}</h3></div>
            </div>
            <div class="intro">{data.keys.key_11}</div>
        </div>
    </div>
</section>
<section class="demo">
    <div class="demo-body">
        <div class="demo-image one">
            <img src="/images/pic_form.png" alt="demo">
        </div>
        <div class="demo-image two">
            <img src="/images/pic_log.png" alt="demo">
        </div>
        <div class="demo-image three">
            <img src="/images/pic_shell.png" alt="demo">
        </div>
    </div>
</section>
<section class="footer">
    <div class="footer-body">
        <div class="footer-content">
            © 2025 Sebertes. Synterix is free and open source software released under the MIT license.
        </div>
    </div>
</section>


<style lang="scss">

  .download {
    line-height: 50px;
    padding: 0 30px 0 30px;
    border-radius: 25px;
    display: inline-block;
    background-color: $primaryContainer;
    color: $onPrimaryContainer;
    font-size: 18px;
    font-weight: 500;
    margin-top: 20px;

    &:hover {
      background-color: $primary;
      color: $onPrimary;
      text-decoration: none;
    }
  }

  .banner {
    position: relative;

    .banner-content {
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      display: flex;

      .left {
        width: 600px;
        display: flex;
        align-items: center;
        //justify-content: center;
      }

      .right {
        flex: 1;
      }
    }

  }

  .color {
    background: radial-gradient(circle at 70%, $surfaceContainerHigh 0%, $surfaceContainerLowest);
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }

  .feature {

    background-color: $surfaceContainerLow;

    .feature-content {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      padding: 40px 0 40px 0;
      grid-template-columns: repeat(4, 1fr);
      gap: 30px;
    }

    .feature-item {
      flex: 1;

      .top {
        display: flex;

        .image {
          width: 30px;
          //text-align: center;
          line-height: 20px;
          height: 20px;
          font-size: 20px;
        }
      }
    }
  }

  .demo {
    background-color: $surfaceContainerHigh;

    .demo-body {
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      padding: 60px 0 60px 0;

      .demo-image {
        width: 80%;
        margin: 0 auto;
        //border-radius: 10px;
        overflow: hidden;
        //@include elevation(5);
        transition: box-shadow 0.3s ease, z-index 0.3s ease;
        position: relative;
        //border: 1px solid $outlineVariant;

        .mask {
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
        }

        img {
          width: 100%;
        }

        &.two {
          position: absolute;
          top: -30px;
          left: -150px;
          width: 70%;
          transform: rotate(-3deg);
        }

        &.three {
          position: absolute;
          bottom: -80px;
          width: 70%;
          right: -150px;
          transform: rotate(5deg);
        }

      }
    }
  }

  .footer {
    background-color: $surfaceContainerLow;

    .footer-body {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px 40px 20px;

      .footer-content {
        text-align: center;
      }
    }
  }

  @media screen and (min-width: 480px) and (max-width: 1200px) {
    .banner {
      position: relative;

      .banner-content {
        max-width: none;
        margin: 0 auto;
        position: relative;
        display: block;
        overflow: hidden;
        padding: 0;

        .left {
          width: 100%;
          display: flex;
          align-items: center;
          margin: 0 auto;
          justify-content: center;
          text-align: center;
          position: relative;
          z-index: 99;
          height: 300px;

          .left-inner {
            position: relative;
          }

          &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
          }
        }

        .right {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 50%;
        }
      }

    }
    .feature {

      background-color: $surfaceContainerLow;
      padding: 0 20px 0 20px;

      .feature-content {
        max-width: none;
        margin: 0 auto;
        display: grid;
        padding: 40px 0 40px 0;
        grid-template-columns: repeat(2, 1fr);
        gap: 30px;
      }
    }
  }

  @media screen and (max-width: 480px) {
    .banner {
      position: relative;

      .banner-content {
        max-width: 480px;
        margin: 0 auto;
        position: relative;
        display: block;
        overflow: hidden;

        .left {
          width: 100%;
          display: flex;
          align-items: center;
          padding: 40px 20px 40px 20px;
          text-align: center;
          position: relative;
          z-index: 99;

          .left-inner {
            position: relative;
          }

          &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
          }
        }

        .right {
          width: 90%;
          position: absolute;
          left: -50px;
          bottom: -10px;
        }
      }

    }
    .feature {

      background-color: $surfaceContainerLow;
      padding: 0 20px 0 20px;

      .feature-content {
        max-width: 480px;
        margin: 0 auto;
        display: grid;
        padding: 40px 0 40px 0;
        grid-template-columns: repeat(1, 1fr);
        gap: 0;
        .feature-item{
          margin-bottom: 30px;
        }
      }
    }

    .demo {
      overflow: hidden;

      .demo-body {
        padding: 20px 0 20px 0;

        .demo-image {
          &.one {
            position: static;
            transform: rotate(0deg);
            width: 100%;
          }

          &.two {
            position: static;
            transform: rotate(0deg);
            width: 100%;
          }

          &.three {
            position: static;
            transform: rotate(0deg);
            width: 100%;
          }
        }
      }
    }
  }
</style>