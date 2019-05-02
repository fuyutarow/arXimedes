import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);


export default new Vuex.Store({
  state: {
  entries: [],
  },
  initEntriesAction(){
    this.entries = []
  },
  pushEntriesAction(entries){
    this.entries.push(...entries);
  },
});
