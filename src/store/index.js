import Vue from 'vue';
import Vuex from 'vuex';
import { getGoodsList, getsidebar } from '../api/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideList: [],
    isLoading: false,
    goodsList: [],
    size: 7,
    // 1,2,苹果，饮用水。。。
    goodsType: '',
    goodsTotal: 0,
    sortType: 'all',
    counterMap: {},
    loadFinish: false,
    page: 1,
  },
  mutations: {
    setPage(state, page) {
      state.page = page;
    },
    setLoadFinish(state, finish) {
      state.loadFinish = finish;
    },
    setCounterMap(state, map) {
      state.counterMap = map;
    },
    setSortType(state, sortType) {
      state.sortType = sortType;
    },
    setGoodsList(state, list) {
      state.goodsList = [...state.goodsList, ...list];
    },
    setSideList(state, payload) {
      state.sideList = payload;
    },
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
    resetGoodsList(state) {
      state.goodsList = [];
      state.loadFinish = false;
      state.page = 1;
    },
    setGoodsType(state, type) {
      state.goodsType = type;
    },
    setGoodsTotal(state, total) {
      state.goodsTotal = total;
    },
    // 要给counterMap实现响应式，且存入localStorage
    storageChange(state, { id, value }) {
      if (state.counterMap[id]) {
        if ((value === 'del') || (value === -1 && state.counterMap[id] === 1)) {
          Vue.delete(state.counterMap, id);
          // delete state.counterMap[id];
        } else {
          Vue.set(state.counterMap, id, state.counterMap[id] + value);
        }
      } else {
        Vue.set(state.counterMap, id, 1);
      }
      localStorage.setItem('goods', JSON.stringify(state.counterMap));
    },
  },
  actions: {
    async getSideList({ commit, dispatch }, type) {
      commit('setIsLoading', true);
      const sideList = await getsidebar(type);
      commit('setSideList', sideList);
      commit('setGoodsType', sideList[0]);
      // 还得请求对应的goods
      // 先重置goodsList
      commit('resetGoodsList');
      await dispatch('getGoodsList', { page: 1 });
      commit('setIsLoading', false);
    },
    async getGoodsList({ state, commit }) {
      const { size, page } = state;
      const sort = state.sortType;
      const type = state.goodsType;
      const goodsListObj = await getGoodsList(
        type,
        page,
        sort,
        size,
      );
      commit('setGoodsList', goodsListObj.list);
      commit('setGoodsTotal', goodsListObj.total);
      commit('setSortType', sort);
      commit('setGoodsType', type);
      if (state.goodsList.length >= goodsListObj.total) {
        commit('setLoadFinish', true);
      } else {
        commit('setLoadFinish', false);
      }
    },
  },
  modules: {
  },
});
