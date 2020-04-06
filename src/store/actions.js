import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'

export default {
  addCart(context, payload) {
    return new Promise(((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量 +1')
      } else {
        payload.counter = 1
        context.commit(ADD_TO_CART, payload)
        resolve('商品添加成功')
      }
    }))
  }
}
