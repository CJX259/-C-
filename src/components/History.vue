<template>
  <div>
    <h4>历史记录：</h4>
    <div class="his-item"
    v-for="(item, i) in historyList"
    :key="i"
    @click="onClick(item.value)"
    >{{item.value}}</div>
  </div>
</template>

<script>
export default {
  props: ['historyList'],
  methods: {
    onClick(value) {
      this.$emit('search', value);
    },
  },
};
</script>

<style lang="less" scoped>
.his-item{
  padding: 8px 12px;
  background: #eee;
  border-radius: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  display: inline-block;
}
</style>
