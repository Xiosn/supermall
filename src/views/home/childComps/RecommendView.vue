<template>
  <div class="recommend">
     <div v-for="index in recommends" :key="index.id" class="recommend-item">
         <a :href="index.link">
            <img :src="index.image" alt=""/>
            <div>{{index.title}}</div>
         </a>
     </div>
  </div>
</template>

<script>
export default {
    name: 'RecommendView',
    props: {
        recommends: {
            type: Array,
            default() {
                return []
            }
        }
    }
}
</script>

<style>
.recommend {
    display: flex; 
    text-align: center; 
    padding: 10px 0 20px;
    border-bottom: 8px solid #eee;
}

.recommend-item {
    flex: auto;
    margin: 0 5px 0 5px;
}

.recommend-item img {
    max-width: 100%;
    margin-bottom: 5px;
}
</style>