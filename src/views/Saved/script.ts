import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';


import { EntryCard } from '@/components';

@Component({
  components : {
    EntryCard,
  },
})
export default class Saved extends Vue {
  get entries() {
    const d = this.$store.state.savedEntryDict.dict;
    return Object.keys(d).map((k) => d[k]);
  }
}
