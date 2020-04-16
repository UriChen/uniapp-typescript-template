import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { IAppState } from './modules/app'
import { IUserState } from './modules/user'

Vue.use(Vuex)

// 数据本地化
export const localStorageData = createPersistedState({
  key: 'appData',
  paths: ['app', 'settings'],
  storage: {
    getItem: key => uni.getStorageSync(key),
    setItem: (key, value) => uni.setStorageSync(key, value),
    removeItem: key => uni.setStorageSync(key, '')
  }
  // reducer: state => ({}) 存储指定数据
})

export interface IRootState {
  app: IAppState
  user: IUserState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({
  plugins: [localStorageData]
})
