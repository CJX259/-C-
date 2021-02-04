<template>
  <div class="classify-warpper">
    <router-link to="/search">
      <div class="search-btn" >
        <van-icon name="search" />
        <div class="search-value">进口苹果1元1斤</div>
      </div>
    </router-link>
    <one-tab />
    <template v-if="!isLoading">
      <side-bar />
      <goods-list />
    </template>
    <van-loading v-else size="2rem" vertical />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import OneTab from '../components/OneTab.vue';
import SideBar from '../components/SideBar.vue';
import GoodsList from '../components/GoodsList.vue';

export default {
  components: {
    OneTab,
    SideBar,
    GoodsList,
  },
  computed: {
    ...mapState(['isLoading']),
  },
};
</script>

<style lang="less" scoped>
.classify-warpper {
  width: 375px;
  position: relative;
  .search-btn {
    width: 355px;
    height: 33px;
    margin: 11px auto 0;
    background: #eee;
    font-size: 14px;
    color: #a1a1a1;
    border-radius: 5px;
    line-height: 31.5px;
    text-align: center;
    >* {
      vertical-align: middle;
      display: inline-block;
    }
  }
}
</style>
