import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;


import 'material-design-icons-iconfont/dist/material-design-icons.css'; // Ensure you are using css-loader
import 'vuetify/dist/vuetify.min.css'; // Ensure you are using css-loader
import Vuetify from 'vuetify';
Vue.use(Vuetify, {
    iconfont: 'md',
});


import VueMathjax from 'vue-mathjax';
Vue.use(VueMathjax);

import VueMarkdown from 'vue-markdown';
Vue.use(VueMarkdown);

import firebase from 'firebase';
import { default as config } from '@/../firebaseConfig.json';
firebase.initializeApp(config);


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
