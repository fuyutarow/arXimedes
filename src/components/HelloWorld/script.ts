import axiosbase from 'axios';
import moment from 'moment';
import VueMarkdown from 'vue-markdown';
import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';

const parseString = require('xml2js').parseString;
import InfiniteLoading from 'vue-infinite-loading';

const axios = axiosbase.create({
  baseURL : 'https://export.arxiv.org/api',

});

@Component({
  components : {
    VueMarkdown,
    InfiniteLoading,
  },
})
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  private  query = {
      search_query: 'a',
      start: 0,
      sortBy: 'lastUpdatedDate',
  };
  // private entries: any[] = [];
  get moment() { return moment; }
  get entries() { return this.$store.state.entries.list; }


  public init() {
    this.$store.dispatch('entries/init');
    this.query.start = 0;
  }

  // get query() {
  //   return {
  //     search_query: this.search_query,
  //     start: this.start,
  //     sortBy: this.sortBy,
  //   }
  // }

  get isStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches;
  }

  get query_params() {
    return Object.assign({}, this.query, {
      search_query : `all:${this.query.search_query}`,
      // sortOrder: 'descending',
      max_result : 10,
    });
  }

  public fetch() {
    axios
        .get('/query', {
          params : this.query_params,
        })
        .then((response) => {
          parseString(response.data, (err: any, result: any) => {
            // this.entries = result.feed.entry;
            this.$store.dispatch('entries/init');
            this.$store.dispatch('entries/push', result.feed.entry);
          });
        });
  }

  @Watch('query.sortBy')
  public search() {
    (document as any).activeElement.blur();
    this.init();
    this.fetch();
    this.query.start += 10;
  }

  public created() {
    // this.init();
    // this.fetch();
  }

  public infiniteHandler($state: any) {
    axios
        .get('/query', {
          params : this.query_params,
        })
        .then((response) => {
          parseString(response.data, (err: any, result: any) => {
            // this.entries.push(...result.feed.entry);
            this.$store.dispatch('entries/push', result.feed.entry);
            this.query.start += 10;
            $state.loaded();
          });
        });
  }
}
