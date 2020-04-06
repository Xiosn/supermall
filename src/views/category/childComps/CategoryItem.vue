<template>
  <div class="contentListItems">
    <div  v-for="(item,index) in categoryList" class="title-item"
    :class="{titleActive:currentIndex===index}" @click='titleClick(index)'>
      {{item.title}}
    </div>
  </div>
</template>

<script>
  import ContentCategory from "./ContentCategory";
  export default {
    name: "CategoryItem",
    props: {
      categoryList: {}
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index;
        //将那个分类被点击返回给父组件
        this.$emit('MenuClick',index);
      },
    },
    components: {
      ContentCategory
    }
  }
</script>

<style scoped>
  .contentListItems {
    font-size: 14px;
  }
  .title-item {
    text-align: center;
    line-height: 45px;
    height: 45px;
    width: 100px;
    border-left: 3px solid #fff;
  }
  .titleActive{
    color: #ff5777;
    border-left: 3px solid rgb(248, 56, 97);
  }
</style>
