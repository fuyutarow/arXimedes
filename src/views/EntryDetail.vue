<template>
  <v-card class="card">
    <v-card-title primary-title>
      <div>
        <vue-mathjax class="headline font-weight-bold" :formula="displayTitle" />
        <div>{{ displayAuthor }}</div>
        <div>published: {{ published }}</div>
      </div>
    </v-card-title>
    <v-card-text class="subheading">
      <vue-mathjax :formula="displaySummary" />
    </v-card-text>

    <v-card-actions>
      <v-list-tile class="grow">
        <v-layout align-center justify-start>
          <v-btn flat :href="`http://arxiv.org/abs/${entryId}`">link</v-btn>
          <v-btn color="red lighten-1" dark fab fixed bottom right @click="getPDF">
            <v-icon>mdi-file-pdf</v-icon>
          </v-btn>
        </v-layout>
      </v-list-tile>
    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
import moment from 'moment';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { VueMathjax } from 'vue-mathjax';

import axiosbase from 'axios';
const axios = axiosbase.create({
  baseURL: 'https://export.arxiv.org/api',
});
import { parseString } from 'xml2js';

@Component({
  components: {
    VueMathjax,
  },
})
export default class EntryDetail extends Vue {
  get entry() {
    return this.$store.state.entryDetail.params;
  }

  get displayTitle() {
    return this.entry.title[0].replace(/\r?\n/g, ' ');
  }

  get displaySummary() {
    const text = this.entry.summary[0].replace(/\r?\n/g, ' ');
    return text;
  }

  get displayAuthor() {
    const authors = this.entry.author.map((author: any) => author.name[0]);
    return authors.join(' ');
  }

  get published() {
    return moment(this.entry.published[0]).format('YYYY-MM-DD');
  }

  get entryId() {
    return this.$route.params.id;
  }

  get pdfURL() {
    return `http://arxiv.org/pdf/${this.entryId}.pdf`;
  }

  public getPDF() {
    const absId: string = this.entryId.split('/').slice(-1)[0];
    this.$store.dispatch('savedEntryDict/add', {
      key: absId,
      value: this.entry,
    });
    location.href = this.pdfURL;
  }

  public async fetchEntry() {
    await axios
      .get('/query', {
        params: { id_list: this.entryId },
      })
      .then((response) => {
        parseString(response.data, (err: any, result: any) => {
          this.$store.dispatch('entryDetail/put', result.feed.entry[0]);
        });
      });
  }

  public created() {
    this.fetchEntry();
  }
}
</script>

<style scoped lang="scss">
.card {
  max-width: 720px;
  margin: 0 auto;
  text-align: left;
  overflow-wrap: break-word;
  overflow: scroll;
  word-wrap: break-word;
}
</style>
