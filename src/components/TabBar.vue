<template>
  <div  class="tab-bar-wrapper">
    <van-tabbar route fixed>
      <van-tabbar-item icon="apps-o" to="/home/classify">分类</van-tabbar-item>
      <van-tabbar-item
      id="shopping"
      icon="cart-o"
      :badge="badge"
      to="/home/shopping"
      >购物车</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['counterMap']),
    badge() {
      const l = Object.values(this.counterMap).reduce((prev, next) => prev + next, 0);
      if (l > 99) {
        return '99+';
      }
      return l;
    },
  },
};
</script>

<style lang="less" scoped>
  // .tab-bar-wrapper{
  //   width: 375px;
  //   position: fixed;
  //   bottom: 0;
  //   height: 50px;
  //   overflow: hidden;
  // }
</style>
