<template>
  <div class="card-wrapper">
    <div class="card-img">
      <img :src="goods.images[0]" ref="img" >
    </div>
    <div class="card-content">
      <div class="title over-hidden">{{goods.title}}</div>
      <div class="desc over-hidden">{{goods.desc}}</div>
      <div class="tags" v-for="(item, i) in goods.tags" :key="'tags'+i">{{item}}</div>
      <div class="price">￥{{goods.price}}</div>
      <div class="counter">
        <div @click="changeLess({id: goods.id, value: -1})" v-if="num">
          <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png">
        </div>
        <div class="num" v-if="num">{{num}}</div>
        <div @click="flyToShopping">
          <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import Animate from '../tools/animate';

export default {
  props: ['goods', 'changeHandler', 'num', 'noFly'],
  data() {
    return {

    };
  },
  methods: {
    changeLess(obj) {
      if (this.num === 1 && this.noFly) {
        Toast('该商品不能再减了喔~');
        return;
      }
      this.changeHandler(obj);
    },
    flyToShopping() {
      this.changeHandler({ id: this.goods.id, value: 1 });
      if (this.noFly) {
        return;
      }
      // 拿到目标img的四个值和目标购物车的四个值
      const { left: imgLeft, top: imgTop } = this.$refs.img.getBoundingClientRect();
      const shopping = document.getElementById('shopping');
      const { left: shoppingLeft, top: shoppingTop } = shopping.getBoundingClientRect();
      const { width, height } = getComputedStyle(shopping, null);
      Animate({
        startX: imgLeft,
        startY: imgTop,
        endX: shoppingLeft,
        endY: shoppingTop,
        width,
        height,
        src: this.$refs.img.src,
      });
    },
  },
};
</script>

<style lang="less" scoped>
  .card-wrapper{
    display: flex;
    margin-bottom: 10px;
    .card-img{
      width: 90px;
      height: 90px;
      margin-right: 20px;
      >img{
        width: 90px;
        height: 90px;
      }
    }
    .card-content{
      position: relative;
      flex: 1;
      .over-hidden{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        }
      .title{
        margin-top: 5px;
        font-size: 13px;
        width: 170px;
        color: #000;
      }
      .desc{
        width: 160px;
        margin-top: 5px;
        color: #aaa;
        font-size: 11px;
      }
      .tags{
        font-size: 10px;
        margin-top: 4px;
        padding: 2px;
        display: inline-block;
        border-radius: 4px;
        color: #aaa;
        margin-right: 4px;
        border: 1px solid #aaa;
      }
      .price{
        font-size: 14px;
        color: #ff1a90;
        margin-top: 4px;
        font-weight: bold;
      }
      .counter{
        position: absolute;
        right: 15px;
        bottom: 0;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        >div:not(.num){
          width: 16px;
          height: 16px;
          img{
            width: 100%;
          }
        }
        .num {
        padding:0 5px;
        height: 22px;
        line-height: 22px;
        }
      }
    }
  }

</style>
