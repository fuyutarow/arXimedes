<template>
  <v-card class="card mx-auto" ripple @click="onclickMore">
    <v-card-title>
      <vue-mathjax :formula="displayTitle" class="title font-weight-medium" />
    </v-card-title>
    <v-card-text>
      <vue-mathjax :formula="displaySummary" class="subheading" />
      <div>
        {{ `${authors[0]} ` }}
        <i class="font-italic" v-if="authors.length>1">et al.</i>
        {{ ` ${published}` }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang='ts'>
import moment from 'moment';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { VueMathjax } from 'vue-mathjax';

@Component({
  components: {
    VueMathjax,
  },
})
export default class EntryCard extends Vue {
  @Prop() private entry: any;

  public onclickMore() {
    this.$store.dispatch('entryDetail/put', this.entry);
    this.$router.push({
      name: 'entryDetail',
      params: { id: this.entryId },
    });
  }

  get entryId() {
    return this.entry.id[0].split('/').slice(-1)[0];
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
