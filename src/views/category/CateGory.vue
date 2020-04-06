<template>
  <div class="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <scroll class="scroll-content left" >
        <category-item @MenuClick="findContent" :categoryList="categoryList"></category-item>
      </scroll>
      <scroll class="scroll-content right" ref="scroll">
        <div class="category-content">
          <content-category class="item"  v-for="(item,index) in contentItemInfo" :content-item-info="item"></content-category>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/scroll";
  import {debounce} from 'common/utils'
  import NavBar from "components/common/navbar/NavBar";
  import CategoryItem from "./childComps/CategoryItem";
  import ContentCategory from "./childComps/ContentCategory";

  import {getCategory,getSubcategory,getCategoryDetail} from 'network/category'
  export default {
    name: "Category",
    data() {
      return {
        categoryList: [],
        ItemMaitKey: 0,
        contentItemInfo: [],
        imagesLoadListener: null,
        recommendGoods: [],
        miniWallkey: 0
      }
    },
    components: {
      ContentCategory,
      NavBar,
      CategoryItem,
      Scroll
    },
    activated() {
      this.$refs.scroll.refresh();
    },
    deactivated() {
      this.$bus.$off('imagesLoaded',this.imagesLoadListener);
    },
    created() {
      //请求分类数据(分类名：title)
      this.getCategory();
      //请求并初始化第一个页面的内容数据
      this.getSubcategory(3627);
      //请求推荐数据并初始化第一个页面的pop类型推荐数据
      this.getCategoryDetail(10062603,'pop');
    },
    mounted() {
      //对监听的事件进行防抖操作
      const refresh = debounce(this.$refs.scroll.refresh,200);
      this.imagesLoadListener = () =>{
        refresh();
      };
      //通过事件总线监听图片加载完成
      this.$bus.$on('itemImagesLoad',this.imagesLoadListener);
    },
    methods: {
      //网络请求的方法
      getCategory() {
        getCategory().then( res => {
          console.log(res);
          
          const data = res.data.category.list;
          this.categoryList = data;
        })
      },
      getSubcategory(maitkey) {
        getSubcategory(maitkey).then(res => {
          this.contentItemInfo = res.data.list;
        })
      },
      getCategoryDetail(miniWallkey,type) {
        getCategoryDetail(miniWallkey,type).then(res=>{
          this.recommendGoods=res;
          this.miniWallkey = miniWallkey;
        })
      },

      //根据传过来的index获取该分类对应数据的maitkey
      findContent(index) {
        this.ItemMaitKey = this.categoryList[index].maitKey;
        //根据当前menu的maitKey请求分类内容数据
        this.getSubcategory(this.ItemMaitKey);
        //根据miniWallkey请求所有推荐类型的数据
        this.getCategoryDetail(this.categoryList[index].miniWallkey,'pop');
/*        this.getCategoryDetail(this.categoryList[index].miniWallkey,'new');
        this.getCategoryDetail(this.categoryList[index].miniWallkey,'sell');*/
      },
      tabControlClick(index) {
        switch (index) {
          case 0: {
            this.getCategoryDetail(this.miniWallkey,'pop');
            break;
          }
          case 1: {
            this.getCategoryDetail(this.miniWallkey,'new');
            break;
          }
          case 2: {
            this.getCategoryDetail(this.miniWallkey,'sell');
            break;
          }
          default: {
            alert('error');
          }
        }
      }
    }
  }
</script>

<style scoped>
  .category {
    height: 100vh;
    overflow: hidden;
  }
  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
  .content {
    display: flex;
    height: 100vh;
    width: 100%;
  }
  .left{
    width: 100px;
  }
  .right {
    flex:1;
  }
  .category-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  .scroll-content{
    height: calc(100% - 93px);
    /* border: 1px solid red; */
    overflow: hidden;
  }

</style>
