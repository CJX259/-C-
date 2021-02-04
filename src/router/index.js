import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Classify from '../views/Classify.vue';
import Search from '../views/Search.vue';
import Shopping from '../views/Shopping.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/home/classify',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        component: Classify,
        name: 'classify',
        path: 'classify',
      },
      {
        component: Shopping,
        name: 'shopping',
        path: 'shopping',
      },
    ],
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
