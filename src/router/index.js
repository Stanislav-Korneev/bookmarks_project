import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../pages/index.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
  },
  {
    path: '/statistics',
    name: 'statistics',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/statistics.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
