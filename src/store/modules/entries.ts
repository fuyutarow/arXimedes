import {Module, VuexModule, Mutation, Action} from 'vuex-module-decorators';


@Module({namespaced: true})
export default class Entries extends VuexModule {
    public list: any[] = [];

    @Mutation public initEntries(entries: any[]) {
        this.list = [];
    }
    @Mutation public pushEntries(entries: any[]) {
        this.list.push(...entries);
    }

    @Action({commit: 'initEntries'})
    public init() {return; }

    @Action({commit: 'pushEntries'})
    public push(entries: any[]) {return entries; }
}
