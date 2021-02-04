<template>
  <div class="home">
    <router-view></router-view>
    <tab-bar />
  </div>
</template>

<script>
import TabBar from '../components/TabBar.vue';

export default {
  name: 'Home',
  components: {
    TabBar,
  },
};
</script>
