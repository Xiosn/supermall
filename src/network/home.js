import {request} from './request';

// 首页轮播
export function getHomeMutidata() {
    return request({
        url: '/home/multidata'
    })
}

// 商品推荐
export function getHomeGoods(type,page) {
    return request({
        url: '/home/data',
        params: {
            type,
            page
        } 
    })
}