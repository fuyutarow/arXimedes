import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import entries from './modules/entries';
import query from './modules/query';


Vue.use(Vuex);


export default new Vuex.Store({
  modules : {
    entries,
    query,
  },
  plugins: [createPersistedState()],
});
