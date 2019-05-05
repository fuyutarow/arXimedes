<template>
  <v-menu transition="slide-y-transition" :nudge-width="200" bottom v-if="token">
    <template v-slot:activator="{ on }">
      <v-avatar v-on="on">
        <img :src="loginUser.photoURL" ></img>
      </v-avatar>
    </template>
    <v-card>
      <v-list>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img :src="loginUser.photoURL" ></img>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ loginUser.displayName }}</v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-tile>
          <v-btn flat color="pink" @click="signout">sign out</v-btn>
        </v-list-tile>
      </v-list>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat v-on="off">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>

  <v-btn fab small outline color="pink lighten-5" @click="signin" v-else>
    <v-icon>account_circle</v-icon>
  </v-btn>
</template>

<script lang='ts'>
import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';

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
