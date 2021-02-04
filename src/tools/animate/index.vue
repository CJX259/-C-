<template>
  <div class="item" :style="{
    transform: `translate(${moveX}px,${moveY}px) scale(${sx},${sy})`,
    opacity: width, height
  }"
  v-if="exist"
  >
    <img :src="src" >
  </div>
</template>

<script>
export default {

};
</script>

<style lang='less' scoped>
.item{
  position: fixed;
  transition: all 1s;
  z-index: 100;
  top: 0;
  left: 0;
  transform-origin: 50px 20px;
  >img{
    width: 100%;
    border-radius: 50%;
  }
}
</style>
