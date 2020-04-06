<template>
  <div class="cart-list">
    <b-scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) of cartList"
        :key="index"
        :itemInfo="item"
      />
    </b-scroll>
  </div>
</template>

<script>
  import BScroll from 'components/common/scroll/scroll'
  import CartListItem from './CartListItem'
  import { mapGetters } from 'vuex'
  export default {
    name: "CartList",
    computed: {
      ...mapGetters(['cartList'])
    },
    components: {
      BScroll,
      CartListItem
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100vh - 44px - 49px - 50px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
