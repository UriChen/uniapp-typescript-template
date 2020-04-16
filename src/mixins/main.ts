import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'MainMixin'
})
export default class MainMixin extends Vue {
  public readonly statusBarHeight = this.StatusBar
  public readonly customBarHeight = this.CustomBar
}
