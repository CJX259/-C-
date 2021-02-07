<template>
  <div class="shopping">
    <div class="top-nav">
      <van-nav-bar
        title="购物车"
        right-text="删除"
        @click-right="del"
      />
    </div>
    <div class="card-list" v-if="list.length !== 0">
      <van-checkbox-group v-model="checkList" ref="checkBoxGroup">
        <div class="card-box" v-for="(item) in list" :key="item.id">
          <van-checkbox class="btn" :name="item.id"></van-checkbox>
          <goods-card
          :changeHandler="storageChange"
          :noFly="true"
          :goods="item"
          :num="counterMap[item.id]"
          />
        </div>
      </van-checkbox-group>
    </div>
    <div class="card-none" v-else>
      <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/shopping_bg.jpg" alt="">
    </div>
    <van-submit-bar
      class="submit"
      :price="allMoney"
      :button-text="`去结算（${checkList.length}）`"
      @submit="onSubmit"
    >
    <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { Toast } from 'vant';
import { getGoodsById } from '../api';
import GoodsCard from '../components/GoodsCard.vue';

export default {
  components: {
    GoodsCard,
  },
  computed: {
    ...mapState(['counterMap']),
    allMoney() {
      // 从已选list里拿到idList，然后累加couterMap里对应id的数量*价格
      let sum = 0;
      this.checkList.forEach((id) => {
        const { price } = this.list.filter((item) => item.id === id)[0];
        sum += this.counterMap[id] * price * 100;
      });
      return sum;
    },
  },
  data() {
    return {
      checkList: [],
      checked: false,
      list: [],
    };
  },
  watch: {
    checkList() {
      if (this.checkList.length === this.list.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
  },
  methods: {
    ...mapMutations(['storageChange']),
    checkAll() {
      if (!this.$refs.checkBoxGroup) {
        Toast('购物车没有商品');
        this.checked = false;
        return;
      }
      if (this.checked) {
        this.$refs.checkBoxGroup.toggleAll(true);
      } else {
        this.$refs.checkBoxGroup.toggleAll(false);
      }
    },
    onSubmit() {
      if (this.checkList.length === 0) {
        Toast('还未选中商品');
      } else {
        Toast('模拟：提交成功');
      }
    },
    async getAllData() {
      const map = JSON.parse(localStorage.getItem('goods'));
      const carList = Object.keys(map);
      // 通过这些id，拿到物品数据
      const res = await getGoodsById(carList.join());
      this.list = res.list;
    },
    async del() {
      // 调用storageChange修改数组，再调用getAllData
      this.checkList.forEach((id) => {
        this.storageChange({ id, value: 'del' });
      });
      this.checkList = [];
      await this.getAllData();
    },
  },
  async created() {
    await this.getAllData();
  },
};
</script>

<style lang="less" scoped>
.shopping{
  width: 100%;
  height: 100vh;
  .card-list{
    height: 521px;
    overflow: auto;
    .card-box{
      display: flex;
      justify-content: center;
      .btn{
        margin-right: 10px;
        flex-shrink: 0;
      }
    }
  }
  .submit{
    margin-bottom: 50px;
  }
}

</style>
