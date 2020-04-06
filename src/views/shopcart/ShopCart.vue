<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <!-- 内容 -->
    <cart-list/>
    <cart-bottom/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import CartList from "./childComps/CartList"
import CartBottom from './childComps/CartBottom'

import { mapGetters } from 'vuex'

export default {
    name:'ShopCart',
    components: {
      NavBar,
      CartList,
      CartBottom
    },
    computed: {
      // 两种语法
      ...mapGetters(['cartLength'])
      // ...mapGetters({
      //   length: 'cartLength',
      //   list: 'cartList'
      // })
    }
}
</script>

<style scoped>
  .cart {
    height: calc(100vh - 44px);
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  /* .cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
  } */
</style>