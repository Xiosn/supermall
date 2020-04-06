<template>
 <div class="shop-item">
    <div class="item-selector">
      <check-button @click.native="checkClick" :isChecked="itemInfo.checked"/>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{itemInfo.price}}</div>
        <div class="item-count right">x{{itemInfo.counter}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from './CheckButton'
  export default {
    name: "CartListItem",
    data() {
      return {
        isChecked: false
      }
    },
    props: {
      itemInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    components: {
      CheckButton
    },
    methods: {
      checkClick() {
        this.itemInfo.checked = !this.itemInfo.checked
      }
    }
  }
</script>

<style scoped>
  .shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    border-bottom: 1px solid #eee;
  }
  .item-selector{
    margin-left: 5px;
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-img {
    padding: 5px;
  }
  .item-img img {
    display: block;
    width: 80px;
    height: 100px;
    border-radius: 5px;
  }
  .item-title, .item-desc {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .item-info {
    font-size: 16px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }
  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }
  .info-bottom {
    margin-top: 30px;
  }
  .item-price {
    color: orangered;
  }
</style>
