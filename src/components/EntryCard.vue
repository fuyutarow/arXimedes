<template>
  <v-card class="card mx-auto">
    <v-card-title @click="onclickMore">
      <vue-mathjax :formula="displayTitle" class="title font-weight-medium" />
      <span class="grey--text subtitle-1">
        {{ `${authors[0]} ` }}
        <i class="font-italic" v-if="authors.length>1">et al.</i>
        {{ ` ${published}` }}
      </span>
    </v-card-title>
    <v-card-text @click="onclickMore">
      {{ entry.id }}
      <vue-mathjax :formula="displaySummary" class="subheading" />
    </v-card-text>
    <v-card-actions>
      <div class="flex-grow-1"></div>
      <template v-if="entry.stared">
        <v-btn icon color="amber" @click="breakStar">
          <v-icon>mdi-star</v-icon>
        </v-btn>
      </template>
      <template v-else>
        <v-btn icon @click="makeStar">
          <v-icon>mdi-star</v-icon>
        </v-btn>
      </template>
    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
import moment from 'moment';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { VueMathjax } from 'vue-mathjax';
import firebase from 'firebase';

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
      params: { id: this.entry.id },
    });
  }

  get displayTitle() {
    return this.entry.data.title[0].replace(/\r?\n/g, ' ');
  }

  get displaySummary() {
    const text = this.entry.data.summary[0].replace(/\r?\n/g, ' ');
    const truncated = text
      .split(/\s+/)
      .slice(0, 30)
      .join(' ');
    return `${truncated} ...`;
  }

  get authors() {
    return this.entry.data.author.map((author: any) => author.name[0]);
  }

  get published() {
    return moment(this.entry.data.published[0]).format('YYYY-MM-DD');
  }

  public breakStar() {
    this.entry.stared = false;
    const uid = this.$store.state.loginUser.detail.uid;
    this.$db
      .collection('user')
      .doc(uid)
      .update({
        starList: firebase.firestore.FieldValue.arrayRemove(this.entry.id),
      });
  }

  public makeStar() {
    this.entry.stared = true;
    const uid = this.$store.state.loginUser.detail.uid;
    this.$db
      .collection('user')
      .doc(uid)
      .update({
        starList: firebase.firestore.FieldValue.arrayUnion(this.entry.id),
      });
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
