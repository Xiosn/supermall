<template>
  <div class="tab-control">
      <div v-for="(item, index) in titles" 
            :key="item.id" 
            class="tab-control-item"
            :class="{active: index === currentIndex}"
            @click="itemclick(index)">
          <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name: 'TabControl',
    props: {
        titles: {
            type: Array,
            default(){
                return []
            }
        }
    },
    data() {
        return {
            // 记录当前选中
            currentIndex: 0
        }
    },
    methods: {
        itemclick(index){
            this.currentIndex = index;
            this.$emit('tabClick', index);
        }
    }
}
</script>

<style>
.tab-control {
    display: flex;
    text-align: center;
    line-height: 40px;
    background-color: #fff;
}

.tab-control-item {
    flex: 1;
}

.tab-control-item span {
    padding: 5px;
}

.active {
    color: var(--color-high-text)
}

.active span {
    border-bottom: 2px solid var(--color-tint); 
}
</style>