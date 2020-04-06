<template>
  <div class="ContentCategory">
    <a  :href="contentItemInfo.link">
      <img v-lazy="contentItemInfo.image" alt="" @load="imgLoad">
      <div>{{contentItemInfo.title}}</div>
    </a>
  </div>
</template>

<script>
  export default {
    name: "ContentCategory",
    props: {
      contentItemInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {

      }
    },
    methods: {
      imgLoad() {
        //通过事件总线发送类别图片加载完毕事件
        this.$bus.$emit('itemImagesLoad');
      }
    }
  }
</script>

<style scoped>
  .ContentCategory {
    width: 80px;
    padding-top: 15px;
    padding-right: 8px;
    font-size: 13px;
    text-align: center;
    line-height: 20px;
  }
  .ContentCategory img {
    width: 75px;
    height: 75px;
  }
</style>
