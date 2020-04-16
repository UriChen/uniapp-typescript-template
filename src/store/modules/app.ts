import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { getLocale } from '@/lang'
import store from '@/store'
import { appSettings } from '@/config'

export interface IAppState {
  theme: string
  language: string
}

@Module({ dynamic: true, store, name: 'app', namespaced: true })
class App extends VuexModule implements IAppState {
  public theme = appSettings.theme
  public language = getLocale()

  @Mutation
  private SET_THEME(theme: string) {
    this.theme = theme
  }

  @Mutation
  private SET_LANGUAGE(language: string) {
    this.language = language
  }

  @Action
  public SetTheme(theme: string) {
    this.SET_THEME(theme)
  }

  @Action
  public SetLanguage(language: string) {
    this.SET_LANGUAGE(language)
  }
}

export const AppModule = getModule(App)
