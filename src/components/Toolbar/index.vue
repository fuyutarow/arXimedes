<template>
  <div>
    <template v-if="$vuetify.breakpoint.xsOnly">
      <v-toolbar color="pink" dark fixed>
        <v-toolbar-items>
          <v-btn flat fab to="/" class="text-none block">
            <img src="@/assets/img/logo.png" height=48px />
          </v-btn>
            <v-btn flat fab @click="onclickSearch">
              <v-icon>search</v-icon>
            </v-btn>
            <v-btn flat fab to="/saved">
              <v-icon>get_app</v-icon>
            </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </template>

    <template v-else>
      <v-toolbar color="pink" dark fixed>
        <v-toolbar-items>
          <v-btn flat to="/" class="text-none block">
            <img src="@/assets/img/logo.png" height=48px />
            <v-toolbar-title>
              arXimedes.io
            </v-toolbar-title>
          </v-btn>
          <v-btn flat @click="onclickSearch">search<v-icon>search</v-icon>
          </v-btn>
          <v-btn flat to="/saved">saved<v-icon>get_app</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </template>

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
    </v-container>

    <v-bottom-sheet v-model="sheet">
      <v-list>
        <v-container>
          <v-layout>
            <v-text-field v-model.trim="query.search_query" v-on:keyup.enter='search' class="mx-3" flat label="Search" prepend-inner-icon="search" solo-inverted></v-text-field>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 md6>
              <v-radio-group v-model="query.sortBy" row @click="sheet=false">
                <v-radio label="New arrivals" color="primary" value="lastUpdatedDate"></v-radio>
                <v-radio label="relevance" color="primary" value="relevance"></v-radio>
              </v-radio-group>
            </v-flex>
          </v-layout>
        </v-container>
      </v-list>
    </v-bottom-sheet>
  </div>
</template>

<script lang='ts' src='./script'></script>

<style scoped lang="scss" src='./style.scss'></style>
