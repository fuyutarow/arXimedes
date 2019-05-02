<template>
  <v-card class='card'>
    <v-card-title primary-title>
      <div>
        <div class="headline font-weight-bold">
          <vue-mathjax :formula="entry.title[0]"></vue-mathjax>
        </div>
        <div>{{ `${authors[0]} ` }}<i class="font-italic" v-if="authors.length>1">et al.</i>{{ `  ${published}` }}</div>
      </div>
    </v-card-title>

    <v-card-text class="subheading">
      <vue-mathjax :formula="displaySummary"></vue-mathjax>
    </v-card-text>

    <v-card-actions>
      <v-list-tile class="grow">
        <v-layout align-center justify-end>
          <v-btn flat v-on:click="onclickMore">more</v-btn>
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
export default class EntryCard extends Vue {
  @Prop() private entry: any;

  public onclickMore() {
    this.$store.dispatch('entryDetail/put', this.entry);
    this.$router.push({
      name: 'entryDetail',
    });
  }

  get displaySummary() {
    const text = this.entry.summary[0].replace(/\r?\n/g, ' ');
    const truncated = text.split(/\s+/).slice(0, 30).join(' ');
    return `${truncated} ...`;
  }

  get authors() {
    return this.entry.author.map((author: any) => author.name[0]);
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
