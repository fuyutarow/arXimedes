import {Module, VuexModule, Mutation, Action} from 'vuex-module-decorators';


@Module({namespaced: true})
export default class SavedEntryDict extends VuexModule {
    public dict: any = {};

    @Mutation public initEntries(entries: any[]) {
        this.dict = {};
    }
    @Mutation public addEntry(keyvalue: any) {
        const absId: string = keyvalue.key;
        const entry: any = keyvalue.value;
        this.dict[absId] = entry;
    }

    @Action({commit: 'initEntries'})
    public init() {return; }

    @Action({commit: 'addEntry'})
    public add(keyvalue: any) {return keyvalue; }
}
