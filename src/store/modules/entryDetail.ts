import Vue from 'vue';
import {Module, VuexModule, Mutation, Action} from 'vuex-module-decorators';


@Module({ namespaced: true })
export default class EntryDetail extends VuexModule {
  public params: any = { };

  @Mutation public initEntry() {
    this.params = { };
  }
  @Mutation public putEntry(entry: any) {
    this.params = entry;
  }

  @Action({commit: 'initEntry'})
  public init() {return; }

  @Action({commit: 'putEntry'})
  public put(entry: any) {return entry; }
}
