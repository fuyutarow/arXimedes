<template>
  <div>
    <v-toolbar color="pink" dark fixed>
      <v-btn flat icon color="white" @click="$router.back()">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <Avatar />
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

<script lang='ts'>
import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';
import Avatar from '@/components/Avatar.vue';

@Component({
  components: {
    Avatar,
  },
})
export default class ToolbarBack extends Vue {}
</script>
