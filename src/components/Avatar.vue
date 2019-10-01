<template>
  <v-menu transition="slide-y-transition" :nudge-width="200" bottom v-if="token">
    <template v-slot:activator="{ on }">
      <v-avatar v-on="on">
        <img :src="loginUser.photoURL" />
      </v-avatar>
    </template>
    <v-card>
      <v-list flat>
        <v-list-item-group color="primary">
          <v-list-item>
            <v-list-item-avatar>
              <v-img :src="loginUser.photoURL" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="loginUser.displayName" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        <v-list-item-group>
          <v-list-item @click="signout">
            <v-list-item-icon>
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-menu>

  <v-btn fab small outlined color="pink lighten-5" @click="signin" v-else>
    <v-icon>mdi-account</v-icon>
  </v-btn>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import firebase from 'firebase';

@Component
export default class Avatar extends Vue {
  get loginUser() {
    return this.$store.state.loginUser.detail;
  }

  get token() {
    return this.$store.state.loginUser.token;
  }

  public async signin() {
    this.$store.dispatch('loginUser/signin');
  }

  public async signout() {
    this.$store.dispatch('loginUser/signout');
  }
}
</script>
