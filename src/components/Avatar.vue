<template>
  <v-avatar @click="signout" v-if="token">
    <img :src="loginUser.photoURL" ></img>
  </v-avatar>
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
