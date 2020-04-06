import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载
const Home = () => import('views/home/Home.vue')
const CateGory = () => import('views/category/CateGory.vue')
const ShopCart = () => import('views/shopcart/ShopCart.vue')
const ProFile = () => import('views/profile/ProFile.vue')
const Detail = () => import('views/detail/Detail.vue')

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        component: Home
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/category',
        component: CateGory
    },
    {
        path: '/shopcart',
        component: ShopCart
    },
    {
        path: '/profile',
        component: ProFile
    },
    {
        path: '/detail/:iid',
        component: Detail
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})


export default router