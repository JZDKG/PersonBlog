<template>
  <div class="home-blog">
    <div class="hero" :style="{ ...bgImageStyle }">
      <div>
        <ModuleTransition>
          <img
            class="hero-img"
            v-if="recoShowModule && $frontmatter.heroImage"
            :style="heroImageStyle || {}"
            :src="$withBase($frontmatter.heroImage)"
            alt="hero"
          />
        </ModuleTransition>

        <ModuleTransition delay="0.04">
          <h1 v-if="recoShowModule && $frontmatter.heroText !== null">
            {{ $frontmatter.heroText || $title || 'vuePress-theme-reco' }}
          </h1>
        </ModuleTransition>

        <ModuleTransition delay="0.08">
          <p v-if="recoShowModule && $frontmatter.tagline !== null" class="description">
            {{ $frontmatter.tagline || $description || 'Welcome to your vuePress-theme-reco site' }}
          </p>
        </ModuleTransition>
      </div>
      <component v-if="bubbles" :is="bubbles" :options="options"></component>
    </div>

    <ModuleTransition delay="0.16">
      <div v-show="recoShowModule" class="home-blog-wrapper">
        <div class="blog-list">
          <!-- 博客列表 -->
          <note-abstract
            :data="$recoPosts"
            :currentPage="currentPage"></note-abstract>
          <!-- 分页 -->
          <pagation
            class="pagation"
            :total="$recoPosts.length"
            :currentPage="currentPage"
            @getCurrentPage="getCurrentPage" />
        </div>
        <div class="info-wrapper">
          <PersonalInfo/>
          <h4><reco-icon icon="reco-category" /> {{homeBlogCfg.category}}</h4>
          <ul class="category-wrapper">
            <li class="category-item" v-for="(item, index) in this.$categories.list" :key="index">
              <router-link :to="item.path">
                <span class="category-name">{{ item.name }}</span>
                <span class="post-num" :style="{ 'backgroundColor': getOneColor() }">{{ item.pages.length }}</span>
              </router-link>
            </li>
          </ul>
          <hr>
          <h4 v-if="$tags.list.length !== 0"><reco-icon icon="reco-tag" /> {{homeBlogCfg.tag}}</h4>
          <TagList @getCurrentTag="getPagesByTags" />
          <h4 v-if="$themeConfig.friendLink && $themeConfig.friendLink.length !== 0"><reco-icon icon="reco-friend" /> {{homeBlogCfg.friendLink}}</h4>
          <FriendLink />
        </div>
      </div>
    </ModuleTransition>

    <ModuleTransition delay="0.24">
      <Content v-show="recoShowModule" class="home-center" custom/>
    </ModuleTransition>
  </div>
</template>

<script>
import TagList from '@theme/components/TagList'
import FriendLink from '@theme/components/FriendLink'
import NoteAbstract from '@theme/components/NoteAbstract'
import pagination from '@theme/mixins/pagination'
import { ModuleTransition, RecoIcon } from '@vuepress-reco/core/lib/components'
import PersonalInfo from '@theme/components/PersonalInfo'
import { getOneColor } from '@theme/helpers/other'

export default {
  mixins: [pagination],
  components: { NoteAbstract, TagList, FriendLink, ModuleTransition, PersonalInfo, RecoIcon },
  data () {
    return {
      recoShow: false,
      currentPage: 1,
      tags: [],
      bubbles: null,
    }
  },
  computed: {
    options() {
      return {
        color: 'rgba(255,254,246,0.72)', //气泡颜色
        radius: 20, //气泡半径
        clearOffset: 0.1, // 气泡消失距离[0-1] 越大越晚消失
        densety: 0.3, // 气泡密度 越大越密集(建议不要大于1)
      }
    },
    recoShowModule () {
      return this.$parent.recoShowModule
    },
    homeBlogCfg () {
      return this.$recoLocales.homeBlog
    },
    actionLink () {
      const {
        actionLink: link,
        actionText: text
      } = this.$frontmatter

      return {
        link,
        text
      }
    },
    heroImageStyle () {
      return this.$frontmatter.heroImageStyle || {}
    },
    bgImageStyle () {
      const initBgImageStyle = {
        textAlign: 'center',
        overflow: 'hidden',
        background: `
          url(${this.$frontmatter.bgImage
    ? this.$withBase(this.$frontmatter.bgImage)
    : require('../images/cloud.jpg')}) center/cover no-repeat
        `
      }
      const {
        bgImageStyle
      } = this.$frontmatter

      return bgImageStyle ? { ...initBgImageStyle, ...bgImageStyle } : initBgImageStyle
    },
    heroHeight () {
      return document.querySelector('.hero').clientHeight
    }
  },
  mounted () {
    import('vue-canvas-effect/src/components/bubbles').then(module => {
      this.bubbles = module.default
    })
    this.recoShow = true
    this._setPage(this._getStoragePage())
    const ifJanchor = document.getElementById("JanchorDown");
    ifJanchor && ifJanchor.parentNode.removeChild(ifJanchor);
    let a = document.createElement('a');
    a.id = 'JanchorDown';
    a.className = 'anchor-down';
    document.getElementsByClassName('hero')[0].append(a);
    let targetA = document.getElementById("JanchorDown");
    targetA.addEventListener('click', e => { // 添加点击事件
      this.scrollFn();
    })
  },
  methods: {
    scrollFn() {
      const windowH = document.getElementsByClassName('hero')[0].clientHeight; // 获取窗口高度
      document.documentElement.scrollTop = windowH; // 滚动条滚动到指定位置
    },
    // 获取当前页码
    getCurrentPage (page) {
      this._setPage(page)
      setTimeout(() => {
        window.scrollTo(0, this.heroHeight)
      }, 100)
    },
    // 根据分类获取页面数据
    getPages () {
      let pages = this.$site.pages
      pages = pages.filter(item => {
        const { home, date } = item.frontmatter
        return !(home == true || date === undefined)
      })
      // reverse()是为了按时间最近排序排序
      this.pages = pages.length == 0 ? [] : pages
    },
    getPagesByTags (tagInfo) {
      this.$router.push({ path: tagInfo.path })
    },
    _setPage (page) {
      this.currentPage = page
      this.$page.currentPage = page
      this._setStoragePage(page)
    },
    getOneColor
  }
}
</script>

<style lang="stylus">
.home-blog {
  padding: 0;
  margin: 0px auto;
  .hero {
    margin 0
    position relative
    box-sizing border-box
    padding 0 20px
    height 100vh
    display flex
    align-items center
    justify-content center
    .hero-img {
      max-width: 300px;
      margin: 0 auto 1.5rem
    }

    h1 {
      display: block;
      margin:0 auto 1.8rem;
      font-size: 2.5rem;
    }

    .description {
      margin: 1.8rem auto;
      font-size: 1.6rem;
      line-height: 1.3;
    }
  }
  .home-blog-wrapper {
    display flex
    align-items: flex-start;
    margin 20px auto 0
    padding 0 20px
    max-width $homePageWidth
    .blog-list {
      flex auto
      width 0
      .abstract-wrapper {
        .abstract-item:last-child {
          margin-bottom: 0px;
        }
      }
    }
    .info-wrapper {
      position -webkit-sticky;
      position sticky;
      top 70px
      overflow hidden
      transition all .3s
      margin-left 15px
      flex 0 0 300px
      height auto
      box-shadow var(--box-shadow)
      border-radius $borderRadius
      box-sizing border-box
      padding 0 15px
      background var(--background-color)
      &:hover {
        box-shadow var(--box-shadow-hover)
      }
      h4 {
        color var(--text-color)
      }
      .category-wrapper {
        list-style none
        padding-left 0
        .category-item {
          margin-bottom .4rem
          padding: .4rem .8rem;
          transition: all .5s
          border-radius $borderRadius
          box-shadow var(--box-shadow)
          background-color var(--background-color)
          &:hover {
            transform scale(1.04)
            a {
              color $accentColor
            }
          }
          a {
            display flex
            justify-content: space-between
            align-items: center
            color var(--text-color)
            .post-num {
              width 1.6rem;
              height 1.6rem
              text-align center
              line-height 1.6rem
              border-radius $borderRadius
              background #eee
              font-size 13px
              color #fff
            }
          }
        }
      }
    }
  }
}

@media (max-width: $MQMobile) {
  .home-blog {
    .hero {
      height 450px
      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        margin: 0 auto 1.8rem ;
        font-size: 2rem;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }
    .home-blog-wrapper {
      display block!important
      .blog-list {
        width auto
      }
      .info-wrapper {
        // display none!important
        margin-left 0
        .personal-info-wrapper {
          display none
        }
      }
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .home-blog {
    .hero {
      height 450px
      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        margin: 0 auto 1.8rem ;
        font-size: 2rem;
      }

      h1, .description, .action {
        // margin: 1.2rem auto;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }

    .home-blog-wrapper {
      display block!important
      .blog-list {
        width auto
      }
      .info-wrapper {
        // display none!important
        margin-left 0
        .personal-info-wrapper {
          display none
        }
      }
    }
  }
}
</style>
<style>
  .anchor-down {
    display: block;
    margin: 12rem auto 0;
    bottom: 45px;
    width: 20px;
    height: 20px;
    font-size: 34px;
    text-align: center;
    animation: bounce-in 5s 3s infinite;
    position: absolute;
    left: 50%;
    bottom: 30%;
    margin-left: -10px;
    cursor: pointer;
  }
  @-webkit-keyframes bounce-in{
    0%{transform:translateY(0)}
    20%{transform:translateY(0)}
    50%{transform:translateY(-20px)}
    80%{transform:translateY(0)}
    to{transform:translateY(0)}
  }
  .anchor-down::before {
    content: "";
    width: 20px;
    height: 20px;
    display: block;
    border-right: 3px solid #fff;
    border-top: 3px solid #fff;
    transform: rotate(135deg);
    position: absolute;
    bottom: 10px;
  }
  .anchor-down::after {
    content: "";
    width: 20px;
    height: 20px;
    display: block;
    border-right: 3px solid #fff;
    border-top: 3px solid #fff;
    transform: rotate(135deg);
  }
</style>