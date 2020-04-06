<template>
  <div class="warpper" ref="warpper">
    <div class="content">
     <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name: 'scroll',
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
        return {
            scroll: null
        }
    },
    mounted() {
      // 1、创建Scroll对象
        this.scroll = new BScroll(this.$refs.warpper, {
          click:true,
          probeType: this.probeType,
          pullUpLoad: this.pullUpLoad

        })

        // 2、监听滚动位置
        if(this.probeType === 1 || this.probeType === 2 || this.probeType === 3) {
            this.scroll.on('scroll', position => {
            // c onsole.log(position);
            this.$emit('scroll', position)
          })
        }

        //3、监听scroll滚动到底部
        if(this.pullUpLoad) {
          this.scroll.on('pullingUp', () => {
            this.$emit('pullingUp')
          })
        }
        
    },
    methods: {
      //滑动到指定(X,y,time)
      scrollTo(x, y, time = 300) {
        this.scroll && this.scroll.scrollTo(x, y, time);
      },

      // 刷新页面
      refresh() {
       this.scroll && this.scroll.refresh()
      },

      // 加载更多
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },

      // 获取当前Y值
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
        // return this.scroll.y
      }
    }
}
</script>

<style scoped>

</style>
