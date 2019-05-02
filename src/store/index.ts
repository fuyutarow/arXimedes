import Vue from 'vue';
import Vuex from 'vuex';

import entries from './modules/entries';


Vue.use(Vuex);


const state = { query: {
  search_query: 'a',
  start: 'a',
  sortBy: 'lastUpdatedDate',
  },
  entries: [],
};
const mutations = { };
const actions = { };

export default new Vuex.Store({
  modules : {
    entries,
  },
});
