<template>
  <div>
    <v-toolbar color="pink" dark fixed>
      <v-text-field v-model.trim="query.search_query" v-on:keyup.enter='search' class="mx-3" flat label="Search" prepend-inner-icon="search" solo-inverted></v-text-field>
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
          <v-radio-group v-model="query.sortBy" row>
            <v-radio label="New arrivals" color="primary" value="lastUpdatedDate"></v-radio>
            <v-radio label="relevance" color="primary" value="relevance"></v-radio>
          </v-radio-group>
        </v-flex>
      </v-layout>
    </v-container>

    <v-card class='card' v-for="(entry, $index) in entries" :key="$index">
      <v-card-title primary-title>
        <div>
          <div class="headline font-weight-bold">
            <vue-mathjax :formula="entry.title[0]"></vue-mathjax>
          </div>
          <div>{{ entry.author.map(author => author.name[0]).join(', ') }}</div>
          <div>published: {{ moment(entry.published[0]).format("YYYY-MM-DD") }}</div>
        </div>
      </v-card-title>

      <v-card-text class="subheading">
        <vue-mathjax :formula="entry.summary[0].replace(/\r?\n/g, ' ')"></vue-mathjax>
      </v-card-text>
      <v-card-actions>
        <v-list-tile class="grow">
          <v-layout align-center justify-end>
            <v-btn flat :href=entry.id[0]>link</v-btn>
            <v-btn flat color="pink" :href="`${entry.id[0].replace(/\r?abs/, 'pdf')}.pdf`">
              PDF
            </v-btn>
          </v-layout>
        </v-list-tile>
      </v-card-actions>
    </v-card>

    <infinite-loading ref="infiniteLoading" spinner="spiral" @infinite="infiniteHandler"> </infinite-loading>
  </div>
</template>

<script lang='ts' src='./script'></script>

<style scoped lang="scss" src='./style.scss'></style>
