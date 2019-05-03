import Vue from 'vue';
import Router from 'vue-router';
import { Home, EntryDetail, Saved } from './views';

Vue.use(Router);


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/entryDetail',
      name: 'entryDetail',
      component: EntryDetail,
    },
    {
      path: '/saved',
      name: 'saved',
      component: Saved,
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import(/* webpackChunkName: "about" */ './views/Welcome.vue'),
    },
  ],
});
