import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { getToken, setToken, removeToken } from '@/utils/cookies'
import store from '@/store'
import { login, logout, getUserInfo } from '@/api/users'
import { ILoginParams } from '@/api/types'
import to from 'await-to-js'
import { handleError } from '@/utils/handleErrors'

export interface IUserState {
  token: string
  roles: string[]
}

@Module({ dynamic: true, store, name: 'user', namespaced: true })
class User extends VuexModule implements IUserState {
  public token = getToken() || ''
  public roles: string[] = []

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  @Mutation
  private SET_ROLES(roles: string[]) {
    this.roles = roles
  }

  @Action
  public ResetToken() {
    removeToken()
    this.SET_TOKEN('')
    this.SET_ROLES([])
  }

  @Action({ rawError: true })
  public GetUserInfo() {
    return new Promise(async(resolve, reject) => {
      if (this.token === '') {
        handleError(Error('GetUserInfo: token is undefined!'))
        return
      }

      uni.showLoading({
        title: '正在获取用户信息...'
      })
      const [err, userData] = await to(getUserInfo())
      uni.hideLoading()
      if (err || !userData) {
        reject('failed')
        return
      }
      const { roles } = userData
      if (!roles || roles.length <= 0) {
        handleError(Error('GetUserInfo: roles must be a non-null array!'))
        reject('failed')
        return
      }
      this.SET_ROLES(roles)
      resolve('success')
    })
  }

  @Action({ rawError: true })
  public async ChangeRoles(role: string) {
    // Dynamically modify permissions
    const token = role + '-token'
    this.SET_TOKEN(token)
    setToken(token)
    await this.GetUserInfo()
  }

  @Action({ rawError: true })
  public UserLogin({ username, password }: ILoginParams) {
    return new Promise(async(resolve, reject) => {
      uni.showLoading({
        title: '正在登录...'
      })
      const [err, data] = await to(login({ username, password }))
      uni.hideLoading()
      if (err || !data) {
        reject('failed')
        return
      }
      setToken(data.token)
      this.SET_TOKEN(data.token)
      resolve('success')
    })
  }

  @Action({ rawError: true })
  public UserLogout() {
    return new Promise((resolve, reject) => {
      const _this = this
      uni.showModal({
        title: '提示',
        content: '确认退出登录吗?',
        success: async function(res) {
          if (res.confirm) {
            const [err] = await to(logout())
            if (err) {
              reject('failed')
              return
            }
            _this.ResetToken()
            resolve('success')
          } else if (res.cancel) {
            reject('failed')
          }
        }
      })
    })
  }
}

export const UserModule = getModule(User)
