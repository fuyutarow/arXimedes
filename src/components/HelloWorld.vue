<template>
  <div class="hello">

      <v-card
    class="mx-auto"
    color="#26c6da"
    dark
    max-width="400"
  >
    <v-card-title>
      <v-icon
        large
        left
      >
        mdi-twitter
      </v-icon>
      <span class="title font-weight-light">Twitter</span>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
      "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
    </v-card-text>

    <v-card-actions>
      <v-list-tile class="grow">
        <v-list-tile-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-img>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>Evan You</v-list-tile-title>
        </v-list-tile-content>

        <v-layout
          align-center
          justify-end
        >
          <v-icon class="mr-1">mdi-heart</v-icon>
          <span class="subheading mr-2">256</span>
          <span class="mr-1">·</span>
          <v-icon class="mr-1">mdi-share-variant</v-icon>
          <span class="subheading">45</span>
        </v-layout>
      </v-list-tile>
    </v-card-actions>
  </v-card>

    <h1>{{ msg }}</h1>
      <div v-for='entry in entries'>
        <p>{{ entry }}</p>
        <a :href=entry.id[0]>{{ entry.id[0] }}</a>
        <p>{{ entry.updated[0] }}</p>
        <p>{{ entry.published[0] }}</p>
        <p>{{ entry.title[0] }}</p>


        <VueMarkdown class='summary' :source="entry.summary[0].replace(/\r?\n/g, ' ')" />

        <p>{{ entry.author[0] }}</p>
        <div v-for='author in entry.author'>
          <a>{{ author.name[0] }}</a>
        </div>
        <hr />
      </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';

import axiosbase from 'axios';
import VueMarkdown from 'vue-markdown';
const parseString = require('xml2js').parseString;


const axios = axiosbase.create({
  baseURL: 'http://export.arxiv.org/api',

});

@Component({
  components: {
    VueMarkdown,
  },
})
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  private feed = {
    entry: [],
  };

  get entries() {
    return this.feed.entry;
  }

  public created() {
    axios
      .get('/query?search_query=all:electron&start=0&max_results=10')
      .then((response) => {
        parseString(response.data, (err: any, result: any) => {
          console.log(result.feed);
          this.feed = result.feed;
        });
      });
  }
}
</script>


<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.summary {
  text-align: left;
  max-width: 720px;
  margin: 0 auto;
}

</style>