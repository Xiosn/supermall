<template>
  <div>
    <nav-bar>
       <div slot="left" 
            class="back" 
            @click="imgClick">
                <img src="~assets/img/common/back.svg">
        </div>
       
       <div slot="center" class="title">
           <div v-for="(item, index) in title" 
                class="title-item"
                :class="{active: index === currentIndex}"
                @click="titleClick(index)">{{item}}
            </div>
       </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue"

export default {
    name: 'DetailNavBar',
    components: {
        NavBar
    },
    data() {
        return {
            title: ['商品', '参数', '评论', '推荐'],
            currentIndex: 0
        }
    },
    methods: {
        titleClick(index) {
            this.currentIndex = index;
            this.$emit('titleClick', index)
        },
        imgClick() {
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
.title {
    display: flex;
    font-size: 13px;
}

.title-item {
    flex: 1;
}

.active {
    color: var(--color-high-text)
}

.back {
    position: relative;
    height: 44px;
}

.back img { 
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>