<template>
  <div id="detail">
      <detail-nav-bar class="detail-nav" @titleClick='titleClick' ref="nav"/>
      <better-scroll class="scroll-height" ref="scroll" :probe-type="3" @scroll="contentScroll">
          <detail-swiper :topImages="topImages"/>
          <detail-base-info :goods="goods"/>
           <detail-shop-info :shop="shop"/>
           <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
           <detail-param-info ref="params" :paramInfo="paramInfo"/>
           <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
           <goods-list ref="recommends" :goods="recommends"/>
      </better-scroll>
      <back-top @click.native='backTopClick' v-show="isShowBackTop"/>
      <detail-bottom-bar @addCart='addToCart'/>
      <!-- <toast :message="message" :show="show"/> -->
  </div>
</template>

<script>
import BetterScroll from "components/common/scroll/scroll"
import GoodsList from 'components/content/goods/GoodsList'

import DetailNavBar from "./childComps/DetailNavBar.vue"
import DetailSwiper from "./childComps/DetailSwiper"
import DetailBaseInfo from "./childComps/DetailBaseInfo"
import DetailShopInfo from "./childComps/DetailShopInfo"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
import DetailParamInfo from "./childComps/DetailParamInfo"
import DetailCommentInfo from "./childComps/DetailCommentInfo"
import DetailBottomBar from './childComps/DetailBottomBar'
// import Toast from 'components/common/toast/Toast'

import { getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail"
import { debounce } from "common/utils"
import { itemListenerMixin, BackTopMixin } from "common/mixin"
    
    export default {
        name: 'Detail',
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            BetterScroll,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            GoodsList,
            DetailBottomBar,
            // Toast
        },
        mixins: [itemListenerMixin, BackTopMixin],
        data() {
            return {
                iid: null,
                topImages: null,
                goods: {},
                shop: {},
                detailInfo: {},
                paramInfo: {},
                commentInfo: {},
                recommends: [],
                themeTopYs: [],
                getThemeTopY: null,
                currentIndex: 0
                // message: '',
                // show: false
                
            }
        },
        created() {
            // 1、保存传入的iid
            this.iid = this.$route.params.iid

            // 2、根据iid请求数据
            getDetail(this.iid).then(res => {

                const data = res.result;
                // 1、获取顶部的图片轮播数据
                this.topImages = data.itemInfo.topImages

                // 2、获取商品信息
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

                // 3、获取店铺信息
               this.shop = new Shop(data.shopInfo);

                // 4、保存商品的详情数据
               this.detailInfo = data.detailInfo;

               //5、获取参数的信息
               this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

                // 6、获取评论数据
                if (data.rate.cRate !== 0) {
                    this.commentInfo = data.rate.list[0]
                }
            })

            //3、请求推荐数据
            getRecommend().then(res => {
                // console.log(res)
                this.recommends = res.data.list
            })

            // 4、给getThemeTopY赋值
            this.getThemeTopY = debounce(() => {
                this.themeTopYs = []
                this.themeTopYs.push(0);
                this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
                this.themeTopYs.push(this.$refs.recommends.$el.offsetTop - 44)
                this.themeTopYs.push(Number.MAX_VALUE)

                // console.log(this.themeTopYs)
            }, 100)
        },
        methods: {
            imageLoad() {
                this.$refs.scroll.refresh()
                this.getThemeTopY()
            },
            titleClick(index) {
                // 点击标题显示对应内容
                this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
            },
            contentScroll(position) {
                // 获取Y值
                const positionY = -position.y;
                let length = this.themeTopYs.length
                // 滚动内容显示对应标题
                for (let i = 0; i < length-1; i++) {
                    if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
                        this.currentIndex = i;
                        this.$refs.nav.currentIndex = this.currentIndex
                    }
                }
 
                //判断Backtop是否显示
                this.isShowBackTop = (-position.y) > 1000
            },
            addToCart() {
                // 1、获取购物车需要展示的信息
                const product = {}
                product.image = this.topImages[0];
                product.title = this.goods.title;
                product.desc = this.goods.desc;
                product.price = this.goods.realPrice;
                product.iid = this.iid;

                // 2、将商品添加到购物车
                // this.$store.commit('add_to_cart', product)
                // this.addCart(product).then(res => {
                // this.$toast.show(res)
                // })
                this.$store.dispatch('addCart', product).then(res => {
                    this.$toast.show(res)
                })
            }
        },
        mounted() {
            // 图片加载完成的时间监听
            // const refresh = debounce(this.$refs.scroll.refresh,50)

            // this.itemImgListenter = () => {
            //   refresh()
            // }
            // // 监听item中图片加载完成
            // this.$bus.$on('itemImageLoad', this.itemImgListenter )
        },
        destroyed() {
            this.$bus.$off('itemImgLoad', this.itemImgListenter)
        }
    }
</script>

<style scoped>
    #detail {
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }

    .detail-nav {
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
    
    .scroll-height {
        height: calc(100% - 44px);
    }
</style>