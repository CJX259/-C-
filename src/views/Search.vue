<template>
  <div class="search-warpper">
    <div class="search-head">
      <div class="arr-left">
        <van-icon name="arrow-left" @click="$router.back(-1)" ></van-icon>
      </div>
      <van-search
        class="search-content"
        :value="searchValue"
        show-action
        :placeholder="place"
        @input="onInput"
        @focus="onFocus"
        autofocus
      >
      <!-- #action，会把此处的内容放到show-action的位置 -->
        <template #action v-if="showList">
          <div @click="onSearch(searchValue)">搜索</div>
        </template>
         <template #action v-else>
          <router-link  to="/home/shopping">
            <div class="shop-car" id="shopping">
              <van-icon name="shopping-cart-o" :badge="badge" />
            </div>
          </router-link>
        </template>
      </van-search>
    </div>
    <div class="likesearch" v-if="showList">
      <van-list>
        <van-cell v-for="(item, i) in likeList"
        :key="i"
        :title="item"
        @click="clickList(item)"/>
      </van-list>
    </div>
    <div class="goods-list" v-else >
      <van-list
        v-model="searchLoading"
        :finished="searchFinish"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <goods-card v-for="(item, i) in searchList" :key="i"
        :goods="item" :changeHandler="storageChange" :num="counterMap[item.id]" />
      </van-list>
    </div>
    <div class="history-list" v-if="likeList.length <= 0 && showList">
      <history @search="historySearch" :historyList="historyList" />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { searchByLike, search } from '../api';
import History from '../components/History.vue';
import GoodsCard from '../components/GoodsCard.vue';

export default {
  components: {
    GoodsCard,
    History,
  },
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
  data() {
    return {
      searchList: [],
      searchValue: '',
      searchTotal: 0,
      searchPage: 1,
      pageSize: 7,
      searchLoading: false,
      searchFinish: false,
      // 现在是展示词条list，false时为展示goodsList
      showList: true,
      // like列表正在加载
      likeLoading: false,
      likefinished: false,
      likeList: [],
      place: '酒',
      historyList: [],
    };
  },
  methods: {
    ...mapMutations(['storageChange']),
    // 记得设置防抖
    async onInput(value) {
      this.searchValue = value;
      if (value === '') {
        this.likeList = [];
        return;
      }
      const res = await searchByLike(value);
      this.likeList = res.result;
    },
    historySearch(value) {
      this.searchValue = value;
      this.onSearch();
    },
    clickList(item) {
      this.searchValue = item;
      // 触发搜索
      this.onSearch();
    },
    initSearch() {
      this.searchTotal = 0;
      this.searchPage = 1;
      this.searchFinish = false;
    },
    async onSearch() {
      this.showList = false;
      this.searchLoading = true;
      this.initSearch();
      if (this.searchValue === '') {
        this.searchValue = this.place;
      }
      const result = this.historyList.find((item) => item.value === this.searchValue);
      if (result) {
        // 已经存过这个记录在历史中
        result.time = new Date().getTime();
        // 重新排序
        this.historyList.sort((a, b) => b.time - a.time);
      } else {
        this.historyList.unshift({ value: this.searchValue, time: new Date().getTime() });
        // 超出长度踢出一个
        if (this.historyList.length >= 11) {
          this.historyList.pop();
        }
      }
      // 存入本地缓存
      localStorage.setItem('historyList', JSON.stringify(this.historyList));
      const res = await search(this.searchValue, this.searchPage, this.pageSize);
      this.searchTotal = res.total;
      this.searchList = res.list;
      if (this.searchList.length >= this.searchTotal) {
        this.searchFinish = true;
      }
      this.searchLoading = false;
    },
    async onFocus() {
      this.showList = true;
      if (this.searchValue === '') {
        this.likeList = [];
        return;
      }
      const res = await searchByLike(this.searchValue);
      this.likeList = res.result;
    },
    async onLoad() {
      if (this.searchFinish) {
        return;
      }
      this.searchLoading = true;
      this.searchPage += 1;
      const res = await search(this.searchValue, this.searchPage, this.pageSize);
      this.searchTotal = res.total;
      this.searchList = [...this.searchList, ...res.list];
      if (this.searchList.length >= this.searchTotal) {
        this.searchFinish = true;
      }
      this.searchLoading = false;
    },
  },
  created() {
    this.historyList = JSON.parse(localStorage.getItem('historyList')) || [];
  },
};

</script>

<style lang="less" scoped>
.search-warpper{
  width: 100%;
  background: #fff;
  .search-head {
    width: 345px;
    background: #fff;
    margin: 0 auto;
    display: flex;
    align-items: center;
    position: fixed;
    left: 15px;
    top: 0;
    z-index: 100;
    .arr-left {
      font-size: 22px;
    }
    .search-content {
      flex: 1;
      .shop-car {
        font-size: 25px;
      }
    }
  }
  .like-search {
    top: 50px;
    position: relative;
    width: 100%;
    box-sizing: border-box;
    padding-left: 30px;
    background: #fff;
    z-index: 10;
  }
  .goods-list {
    position: relative;
    width: 345px;
    margin: 48px auto 0;
    z-index: 10;
    background: #fff;
  }
  .history-list {
    width: 350px;
    position: absolute;
    top: 55px;
    left: 10px;
    z-index: 1;
  }
}
</style>
