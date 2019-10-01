<template>
  <v-app>
    <Toolbar />
    <v-content>
      <keep-alive>
        <router-view />
      </keep-alive>
    </v-content>
  </v-app>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Toolbar } from '@/components';

@Component({
  components: {
    Toolbar,
  },
})
export default class App extends Vue {}
</script>
