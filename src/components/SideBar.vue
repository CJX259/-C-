<template>
  <div class="side-bar-wrapper" ref="sidebar">
    <div
      :class="['side-bar-item', { active: index == i }]"
      v-for="(item, i) in this.sideList"
      :key="item"
      @touchend="scrollTo(i,item, $event)"
      @touchstart="move = false"
      @touchmove="move = true"
    >
      {{ i==0 ? '全部' : item }}
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import moveScroll from '../utils/tools';

export default {
  computed: {
    ...mapState(['sideList']),
  },
  data() {
    return {
      index: 0,
      move: false,
    };
  },
  methods: {
    ...mapActions(['getGoodsList']),
    ...mapMutations(['resetGoodsList', 'setGoodsType']),
    scrollTo(i, item, e) {
      if (this.move) {
        return;
      }
      this.index = i;
      const { sidebar } = this.$refs;
      const sonHeight = e.target.offsetHeight;
      const pHeight = sidebar.offsetHeight;
      const sonBCRTop = e.target.getBoundingClientRect().top;
      const pBCRTop = sidebar.getBoundingClientRect().top;
      const res = sonBCRTop - pBCRTop + sonHeight / 2 - pHeight / 2;
      moveScroll(sidebar.scrollTop, res, sidebar, 'scrollTop');
      // 重置所有list,要提示goodsList的finish变回false,否则无法翻页！
      this.resetGoodsList();
      // 请求当前type的list; item是type
      this.setGoodsType(item);
      this.getGoodsList({ page: 1 });
    },
  },
  created() {
    this.getGoodsList({ page: 1, sort: 'all' });
  },
};
</script>

<style lang="less" scoped>
.side-bar-wrapper {
  width: 80px;
  background: #f8f8f8;
  position: fixed;
  left: 0;
  top: 144px;
  bottom: 50px;
  overflow: auto;
  text-align: center;
  .side-bar-item {
    height: 40px;
    width: 80px;
    line-height: 40px;
    position: relative;
  }

  .active {
    &.side-bar-item {
      color: #ff1a90;
      font-size: 12px;
      font-weight: bold;
    }
    &.side-bar-item::before {
      content: "";
      width: 6px;
      height: 18px;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      background: #ff1a90;
    }
  }
}
.side-bar-wrapper::-webkit-scrollbar{
  background: none;
  width: 0;
}
</style>
