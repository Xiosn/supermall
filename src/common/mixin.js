// 混入
import { debounce } from "./utils"
import BackTop from 'components/content/backTop/BackTop'

//抽取监听图片加载完成，然后刷新scroll可滚动高度mixin
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,200);//直接使用utils中导入的防抖函数
    //对home路由下监听的事件进行保存
    this.itemImgListener = ()=>{
      refresh();
    };
    //监听事件总线的itemImgLoad事件
    this.$bus.$emit('itemImgLoad',this.itemImgListener);
  }
};


// 点击回到顶部按钮
export const BackTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false
        }
    },
    methods: {
        backTopClick() {
            this.$refs.scroll.scrollTo(0, 0, 500)
          }
    }
}


export const tabControlMixin = {
    data: function () {
      return {
        currentType: POP
      }
    },
    methods: {
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = POP
            break
          case 1:
            this.currentType = NEW
            break
          case 2:
            this.currentType = SELL
            break
        }
        console.log(this.currentType);
      }
    }
  }