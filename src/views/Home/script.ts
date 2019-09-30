import axiosbase from 'axios';
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';

import {parseString} from 'xml2js';
import InfiniteLoading from 'vue-infinite-loading';
import {EntryCard} from '@/components';

const axios = axiosbase.create({
    baseURL: 'https://export.arxiv.org/api',
});

@Component({
    components: {
        InfiniteLoading,
        EntryCard,
    },
})
export default class Home extends Vue {
    get entries() {return this.$store.state.entries.list; }
    get query() {return this.$store.state.query.params; }
    get query_params() {
        return Object.assign({}, this.query, {
            search_query: `all:${this.query.search_query}`,
            max_result: 10,
            // sortOrder: 'descending',
        });
    }

    public infiniteHandler($state: any) {
        axios
            .get('/query', {
                params: this.query_params,
            })
            .then((response) => {
                parseString(response.data, (err: any, result: any) => {
                    this.$store.dispatch('entries/push', result.feed.entry);
                    this.query.start += 10;
                    $state.loaded();
                });
            });
    }
}
