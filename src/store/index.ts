import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import query from './modules/query';
import entries from './modules/entries';
import entryDetail from './modules/entryDetail';


Vue.use(Vuex);


export default new Vuex.Store({
  modules : {
    query,
    entries,
    entryDetail,
  },
  plugins: [
    // createPersistedState({ storage: window.sessionStorage }),
    createPersistedState(),
  ],
});
