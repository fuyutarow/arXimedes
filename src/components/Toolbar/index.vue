<template>
  <div>
    <v-app-bar app color="indigo" dark>
      <v-btn flat icon color="white" @click="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <template v-if="$vuetify.breakpoint.xsOnly">
        <v-btn text to="/" class="text-none block">
          <img src="@/assets/logo.png" height="48px" />
        </v-btn>
        <v-btn outlined fab small color="pink lighten-5" @click="onclickSearch">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
      <template v-else>
        <v-btn to="/" text>
          <img src="@/assets/logo.png" height="48px" />
          <v-toolbar-title class="text-none">arXimedes.io</v-toolbar-title>
        </v-btn>
        <v-btn flat outlined color="pink lighten-5" @click="onclickSearch">
          search
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
      <v-spacer />
      <Avatar />
    </v-app-bar>

    <v-bottom-sheet v-model="sheet">
      <v-list>
        <v-container>
          <v-layout>
            <v-text-field
              v-model.trim="query.search_query"
              v-on:keyup.enter="search"
              class="mx-3"
              prepend-inner-icon="mdi-magnify"
              outlined
              clearable
              rounded
              solo
            />
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
