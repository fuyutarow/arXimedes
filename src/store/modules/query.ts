import {Module, VuexModule, Mutation, Action} from 'vuex-module-decorators';


@Module({namespaced: true})
export default class Query extends VuexModule {
    public params = {
        search_query: 'a',
        start: 0,
        sortBy: 'lastUpdatedDate',
    };

    @Mutation public initQuery() {
        this.params = {
            search_query: 'a',
            start: 0,
            sortBy: 'lastUpdatedDate',
        };
    }

    @Mutation public assignQuery(query: any) {
        this.params = Object.assign({}, this.params, query);
    }

    @Action({commit: 'initQuery'})
    public init() {return; }

    @Action({commit: 'assignQuery'})
    public assign(query: any) {return query; }
}
