<template>
    <swiper>
    <swiper-item v-for="index in banners" :key="index.id">
        <a :href="index.link">
        <img :src="index.image" alt="" @load="imageLoad"/>
        </a>
    </swiper-item>
    </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'

export default {
    name: 'HomeSwiper',
    props: {
        banners: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return{
            isLoad: false
        }
    },
    components: {
        Swiper, 
        SwiperItem
    },
    methods: {
        imageLoad() {
            if (!this.isLoad) {
                this.$emit('swiperImageLoad')
                this.isLoad= true
            }
            
        }
    }
}
</script>

<style>

</style>