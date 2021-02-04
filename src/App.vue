<template>
  <transition :name="transitionName" mode="out-in">
    <router-view class="view"></router-view>
  </transition>
</template>

<script>
export default {
  created() {
    const counterMap = JSON.parse(localStorage.getItem('goods')) || {};
    this.$store.commit('setCounterMap', counterMap);
  },
  data() {
    return {
      // 页面从left进入（搜索页面从左边进入）
      transitionName: 'left',
    };
  },
  watch: {
    $route(to, from) {
      if (to.name === 'classify' && from.name === 'search') {
        // 意为从search回到分类页面
        // 通过这个值，控制transition的类名
        this.transitionName = 'right';
      } else {
        this.transitionName = 'left';
        // this.$router.back = false;
      }
    },
  },
};
</script>
<style lang="less">
.left-enter{
  transform: translateX(100%);
}
.right-leave-active{
  transition: all .3s ease;
}
.left-enter-active{
  transition: all .3s ease;
}

.right-leave-to{
  transform: translateX(100%);
}

</style>
