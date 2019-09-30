import Vue from 'vue';
import Router from 'vue-router';
import {Home, EntryDetail, Saved} from './views';

Vue.use(Router);


export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: {name: 'entry'},
        },
        {
            name: 'entry',
            path: '/entry',
            component: Home,
        },
        {
            name: 'entryDetail',
            path: '/entry/:id', component: EntryDetail,
        },
        {
            name: 'saved',
            path: '/saved',
            component: Saved,
        },
        {
            name: 'welcome',
            path: '/welcome',
            component: () => import(/* webpackChunkName: "about" */ './views/Welcome.vue'),
        },
    ],
});
