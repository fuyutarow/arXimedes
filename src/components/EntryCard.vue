<template>
  <v-card class="card mx-auto" ripple @click="onclickMore">
    <v-card-text>
      <vue-markdown class="title font-weight-medium">{{ displayTitle }}</vue-markdown>
      <vue-markdown class="subheading">{{ displaySummary }}</vue-markdown>
      <v-list-tile class="grow">
        <v-list-tile-content>
          <v-list-tile-title class="body-1">
            {{ `${authors[0]} ` }}
            <i class="font-italic" v-if="authors.length>1">et al.</i>
            {{ ` ${published}` }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-card-text>
  </v-card>
</template>

<script lang='ts'>
import moment from 'moment';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import VueMarkdown from 'vue-markdown';

@Component({
  components: {
    VueMarkdown,
  },
})
export default class EntryCard extends Vue {
  @Prop() private entry: any;

  public onclickMore() {
    this.$store.dispatch('entryDetail/put', this.entry);
    this.$router.push({
      name: 'entryDetail',
    });
  }

  get displayTitle() {
    return this.entry.title[0].replace(/\r?\n/g, ' ');
  }

  get displaySummary() {
    const text = this.entry.summary[0].replace(/\r?\n/g, ' ');
    const truncated = text
      .split(/\s+/)
      .slice(0, 30)
      .join(' ');
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
