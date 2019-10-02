import {Module, VuexModule, Mutation, Action} from 'vuex-module-decorators';

interface Entry {
    id: string;
    data: any;
    stared: boolean;
}

@Module({namespaced: true})
export default class Entries extends VuexModule {
    public list: Entry[] = [];

    @Mutation public initEntries(entries: any[]) {
        this.list = [];
    }
    @Mutation public pushEntries(entries: any[]) {
        this.list.push(...entries);
    }

    @Action({commit: 'initEntries'})
    public init() {return; }

    @Action({commit: 'pushEntries'})
    public push(entries: Entry[]) {return entries; }

    @Action({commit: 'pushEntries'})
    public pushFeedEntries(feedEntries: any[]) {
        const parseEntryId = (s: string) => s.split('/').slice(-1)[0].split('v').slice()[0];
        const entries: Entry[] = feedEntries.map((feedEntry: any) => {
            const entryId: string = parseEntryId(feedEntry.id[0]);
            return {
                id: entryId,
                data: feedEntry,
                stared: false,
            };
        });
        return entries;
    }
}
