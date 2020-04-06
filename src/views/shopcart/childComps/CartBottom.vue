<template>
  <div class="bottom-bar">
    <div class="button-zone">
      <check-button
        class="check-button"
        :is-checked="isSelectorAll"
        @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="total-price">合计：￥{{totalPrice}}</div>
    <div class="calculate" @click="calcClick">去结算：({{checkLength}})</div>
  </div>
</template>

<script>
  import CheckButton from './CheckButton'
  export default {
    name: "CartBottom",
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        return this.$store.getters.cartList.filter(item => {
          return item.checked
        }).reduce((pre, item) => {
          return pre + item.price * item.counter
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.$store.getters.cartList.filter(item => item.checked).length
      },
      isSelectorAll() {
        if (this.$store.getters.cartList.length === 0) return false
        return !this.$store.getters.cartList.find(item => !item.checked)
      }
    },
    methods: {
      checkClick() {
        if(this.isSelectorAll) {
          this.$store.getters.cartList.forEach(item => item.checked = false)
        } else {
          this.$store.getters.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick() {
        if(!this.isSelectorAll) {
          this.$toast.show('请选择购买的商品')
          
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    height: 42px;
    background-color: #fff;
    position: relative;
    border-top: 1px solid rgb(250, 247, 247);
    font-size: 15px;
  }
  .button-zone {
    display: flex;
  }
  .check-button {
    margin: 11px 6px 10px 10px;
  }
  .button-zone span {
    line-height: 42px;
    color: #fff;
    margin-right: 18px;
  }
  .total-price {
    line-height: 42px;
  }
  .calculate {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    line-height: 42px;
    padding: 0 20px;
    background-color: orangered;
    color: #fff;
  }
</style>
