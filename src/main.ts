import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

import 'katex/dist/katex.min.css';

import 'material-design-icons-iconfont/dist/material-design-icons.css'; // Ensure you are using css-loader
import 'vuetify/dist/vuetify.min.css'; // Ensure you are using css-loader
import Vuetify from 'vuetify';
Vue.use(Vuetify, {
    iconfont: 'md',
});


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
