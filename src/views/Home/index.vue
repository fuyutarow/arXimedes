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
          <v-btn flat to='/saved'>saved</v-btn>
        </v-flex>
      </v-layout>
    </v-container>

    <EntryCard :entry="entry" v-for="(entry, $index) in entries" :key="$index" />

    <infinite-loading ref="infiniteLoading" spinner="spiral" @infinite="infiniteHandler"> </infinite-loading>
  </div>
</template>

<script lang='ts' src='./script'></script>

<style scoped lang="scss" src='./style.scss'></style>
