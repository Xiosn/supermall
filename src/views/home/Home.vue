<template>
  <div id='home'>
      <!-- 导航栏 -->
        <nav-bar class="home-nav">
          <div slot="center">购物街</div>
        </nav-bar>

    <tab-control 
         :titles="['流行', '新款', '精选']" 
         @tabClick="tabClick"
         ref="tabControl1"
         class="tab_control"
         v-show="isTabFixed"/>

     <scroll class="content" 
        ref="scroll" 
        :probe-type='3' 
        @scroll="contnetScroll"
        :pull-up-load='true'
        @pullingUp='loadMore'>
        <!-- 轮播图 -->
        <home-swiper :banners='banners' @swiperImageLoad='swiperImageLoad'/>

        <!-- 首页推荐 -->
        <recommend-view :recommends="recommends"/>

        <feature-view/>

        <tab-control 
         :titles="['流行', '新款', '精选']" @tabClick="tabClick"
         ref="tabControl2" />

        <goods-list :goods="showGoods"/>
     </scroll>
     <back-top @click.native='backTopClick' v-show="isShowBackTop"/>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from "components/common/navbar/NavBar"
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/scroll'

import { getHomeMutidata, getHomeGoods } from "network/home"
import { itemListenerMixin, BackTopMixin} from "common/mixin"

export default {
    name: 'Home',
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll
    },
    mixins: [itemListenerMixin, BackTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': { page: 0, list: [] },
          'new': { page: 0, list: [] },
          'sell': { page: 0, list: [] },
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    activated() {
      if(this.$refs.scroll != undefined) {
         this.$refs.scroll.scrollTo(0, this.saveY, 50)
         this.$refs.scroll.refresh()
      }
    },
    deactivated() {
      // 1、保存Y值
      this.saveY = this.$refs.scroll.getScrollY()

      // 2、取消全局事件监听
      this.$bus.$off('itemImgLoad', this.itemImgListenter)
    },
    methods: {
      /**
       * 事件监听相关方法
       */
      tabClick(index) {
        // console.log(index);
        switch(index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            break;
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
     
      contnetScroll(position) {

        //1、判断Backtop是否显示
        this.isShowBackTop = (-position.y) > 1000

        // 2、决定tabControl是否吸顶（position：fixed）
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
         // 2、获取tabControl的offsetTop
        //所有的组件都有一个属性$el：用于获取组件中元素
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop

        // console.log(this.tabOffsetTop)
        // console.log(this.isTabFixed)

      },
      
      /**
       * 网络请求相关方法
       */
      getHomeMutidata() {
        getHomeMutidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1

        // 刷新上拉加载更多记录
        this.$refs.scroll.finishPullUp()
        })
      }
    },
    created() {
      // 1、请求多个数据
      this.getHomeMutidata();

      // 2、请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

    },
    mounted() {
      // // 图片加载完成的时间监听
      // const refresh = debounce(this.$refs.scroll.refresh,50)

      // this.itemImgListenter = () => {
      //   refresh()
      // }
      // // 监听item中图片加载完成
      // this.$bus.$on('itemImageLoad', this.itemImgListenter )
    },

    // 事件总线销毁
    // beforeDestroy () {
    //     this.$bus.$off('itemImageLoad')
    // }
}
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }

  .tab_control {
    position: relative;
    z-index: 9;
  }

  .content {
    /* height: calc(100vh - 93px); */
    position: absolute;
    top: 44px;
    bottom: 49px;
    overflow: hidden;
  }

</style>