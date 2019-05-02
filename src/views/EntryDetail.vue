<template>
  <v-card class='card'>
    <v-card-title primary-title>
      <div>
        <div class="headline font-weight-bold">
          <vue-mathjax :formula="entry.title[0]"></vue-mathjax>
        </div>
        <div>{{ displayAuthor }}</div>
        <div>published: {{ published }}</div>
      </div>
    </v-card-title>

    <v-card-text class="subheading">
      <vue-mathjax :formula="displaySummary"></vue-mathjax>
    </v-card-text>

    <v-card-actions>
      <v-list-tile class="grow">
        <v-layout align-center justify-end>
          <v-btn flat :href=entryId>link</v-btn>
          <v-btn flat color="pink" :href="pdfURL">PDF</v-btn>
        </v-layout>
      </v-list-tile>
    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
import moment from 'moment';
import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';

@Component
export default class EntryDetail extends Vue {
  get entries() {
    return this.$store.state.entries.list;
  }

  get entry() {
    const entryId = this.$route.params.entryId;
    return this.entries
      .filter((entry: any) => entry.id[0] === entryId)[0];
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
    return `${this.entry.id[0]}`;
  }

  get pdfURL() {
    return `${this.entry.id[0].replace(/\r?abs/, 'pdf')}.pdf`;
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
