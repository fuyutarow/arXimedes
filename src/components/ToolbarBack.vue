<template>
  <div>
    <v-toolbar color="pink" dark fixed>
      <v-toolbar-items>
        <v-btn flat icon color="white" to="/">
          <v-icon>arrow_back</v-icon>
        </v-btn>
      </v-toolbar-items>
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
    </v-container>
  </div>
</template>
