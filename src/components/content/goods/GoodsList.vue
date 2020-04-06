<template>
  <div class="goods">
    <goods-list-item  class="goods-list-item" v-for="item in goods" :key="item.id" :goods-item='item'/>
  </div>
</template>

<script>
import GoodsListItem from 'components/content/goods/GoodsListItem'

export default {
    name: 'GoodsList',
    components:{
        GoodsListItem
    },
    props: {
        goods: {
            type: Array,
            default() {
                return []
            }
        }
    }
}
</script>

<style>
.goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}
</style>