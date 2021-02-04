<template>
  <div class="list-wrapper">
    <div class="list-header van-hairline--top-bottom">
      <div :class="{ active: sortType === 'all' }" @click="changeType('all')">
        综合
      </div>
      <div :class="{ active: sortType === 'sale' }" @click="changeType('sale')">
        销量
      </div>
      <div
        :class="[
          'price',
          {
            'price-up': sortType === 'price-up',
            'price-down': sortType === 'price-down',
          },
        ]"
        @click="changeType('price')"
      >
        价格
      </div>
    </div>
    <div class="list-content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="loadFinish"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <goods-card v-for="(item, i) in goodsList" :key="i"
          :goods="item" :changeHandler="storageChange" :num="counterMap[item.id]" />
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import GoodsCard from './GoodsCard.vue';

export default {
  components: {
    GoodsCard,
  },
  computed: {
    ...mapState(['page', 'goodsList', 'goodsTotal', 'counterMap', 'loadFinish']),
  },
  data() {
    return {
      sortType: 'all',
      loading: false,
      isLoading: false,
    };
  },
  methods: {
    ...mapMutations(['resetGoodsList', 'setPage', 'setGoodsList', 'setSortType', 'storageChange', 'setLoadFinish']),
    ...mapActions(['getGoodsList']),
    async onLoad() {
      if (this.loadFinish) {
        return;
      }
      this.loading = true;
      this.setPage(this.page + 1);
      await this.getGoodsList();
      this.loading = false;
    },
    async onRefresh() {
      this.isLoading = true;
      // 重新请求
      this.resetGoodsList();
      this.loading = true;
      await this.getGoodsList();
      this.loading = false;
      this.isLoading = false;
    },
    changeType(type) {
      if (type !== 'price') {
        this.sortType = type;
      } else if (this.sortType === 'price-up') {
        this.sortType = 'price-down';
      } else {
        this.sortType = 'price-up';
      }
      this.setSortType(this.sortType);
      this.onRefresh();
    },
  },
};
</script>

<style lang="less" >
.list-wrapper {
  width: 295px;
  margin-left: 80px;
  position: fixed;
  left: 0;
  top: 144px;
  overflow: auto;
  bottom: 50px;
  .list-header {
    position: sticky;
    background: #fff;
    z-index: 100;
    top: 0;
    display: flex;
    padding-right: 8px;
    box-sizing: border-box;
    height: 25px;
    justify-content: flex-end;
    > div {
      width: 50px;
      height: 25px;
      text-align: center;
      line-height: 25px;
      color: #cecece;
      position: relative;
    }
    .price::after {
      content: "";
      position: absolute;
      border: 4px solid transparent;
      border-top-color: #aaa;
      bottom: 4px;
      right: 0;
    }
    .price::before {
      content: "";
      position: absolute;
      border: 4px solid transparent;
      border-bottom-color: #aaa;
      top: 4px;
      right: 0;
    }
    .price-down::after {
      border-top-color: #ff1a90;
    }
    .price-up::before {
      border-bottom-color: #ff1a90;
    }
    .active,
    .price-up,
    .price-down {
      color: #ff1a90;
      font-weight: bold;
    }
  }
  .list-content{
    display: flex;
    position: relative;
    flex-direction: column;
  }
}
.van-pull-refresh__head {
  top: 12px;
}
</style>
