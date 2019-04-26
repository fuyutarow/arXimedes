<template>
  <div>
    <v-toolbar color="pink" dark fixed>
      <v-text-field v-model.trim="search_query" v-on:keyup.enter='search' class="mx-3" flat label="Search" prepend-inner-icon="search" solo-inverted></v-text-field>
    </v-toolbar>

    <v-container grid-list-xl>
      <v-layout>
        <v-flex>
          <v-card dark color="primary">
            <v-card-text></v-card-text>
          </v-card>
        </v-flex>
        <v-flex>
          <v-card dark color="secondary">
            <v-card-text></v-card-text>
          </v-card>
        </v-flex>
        <v-flex>
          <v-card dark color="accent">
            <v-card-text></v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 sm6 md6>
          <v-radio-group v-model="sortBy" row>
            <v-radio label="New arrivals" color="primary" value="lastUpdatedDate"></v-radio>
            <v-radio label="relevance" color="primary" value="relevance"></v-radio>
          </v-radio-group>
        </v-flex>
      </v-layout>
    </v-container>

    <div v-for="(entry, $index) in entries" :key="$index">


      <v-card class='card'>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{entry.title[0]}}</h3>
            <div class="authors">{{ entry.author.map(author => author.name[0]).join(', ') }}</div>
            <div class="authors">published: {{ moment(entry.published[0]).format("YYYY-MM-DD") }}</div>
          </div>
        </v-card-title>

        <v-card-text class="headline">
          <VueMarkdown class='summary' :source="entry.summary[0].replace(/\r?\n/g, ' ')" />
        </v-card-text>

        <v-card-actions>
          <v-list-tile class="grow">
            <v-layout align-center justify-end>
              <v-btn flat :href=entry.id[0]>link</v-btn>
              <span class="mr-1">·</span>
              <v-btn fab dark small color="pink" :href="`${entry.id[0].replace(/\r?abs/, 'pdf')}.pdf`">
                <v-icon dark>add</v-icon>
              </v-btn>
            </v-layout>
          </v-list-tile>
        </v-card-actions>
      </v-card>

    </div>
    <infinite-loading ref="infiniteLoading" spinner="spiral" @infinite="infiniteHandler"> </infinite-loading>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';



import axiosbase from 'axios';
import VueMarkdown from 'vue-markdown';
import moment from 'moment';
const parseString = require('xml2js').parseString;
import InfiniteLoading from 'vue-infinite-loading';


const axios = axiosbase.create({
  baseURL: 'https://export.arxiv.org/api',

});

@Component({
  components: {
    VueMarkdown,
    InfiniteLoading,
  },
})
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  private search_query = 'a';
  private start = 0;
  private sortBy = 'lastUpdatedDate';
  private entries: any[] = [];
  get moment() {
    return moment;
  }

  public init() {
    this.entries = [];
    this.start = 0;
  }

  get query_params() {
    return {
      search_query: `all:${this.search_query}`,
      sortBy: this.sortBy,
      // sortOrder: 'descending',
      start: this.start,
      max_result: 10,
    };
  }

  public fetch() {
    axios
      .get('/query', {
        params: this.query_params,
      })
      .then((response) => {
        parseString(response.data, (err: any, result: any) => {
          console.log(result.feed);
          this.entries = result.feed.entry;
        });
      });
  }

  @Watch('sortBy')
  public search() {
    (document as any).activeElement.blur();
    this.init();
    this.fetch();
    this.start += 10;
  }


  public created() {
    this.init();
    this.fetch();
  }

  public infiniteHandler($state: any) {
    axios
      .get('/query', {
        params: this.query_params,
      })
      .then((response) => {
        parseString(response.data, (err: any, result: any) => {
          console.log(result.feed);
          this.entries.push(...result.feed.entry);
          this.start += 10;
          $state.loaded();
        });
      });
  }
}
</script>


<style scoped lang="scss">
.card {
  max-width: 720px;
  margin: 0 auto;
}

.authors {
  text-align: left;
  font-size: 15px;
}


.headline {
  text-align: left;
}

.summary {
  text-align: left;
  margin: 0 auto;
  font-size: 15px;
  font-weight: normal;
  color: #111;
  margin-bottom: 2em;
  line-height: 1.2;
}

</style>
