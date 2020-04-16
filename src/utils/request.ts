import axios from 'uni-axios-ts'
import { UserModule } from '@/store/modules/user'
import { REQUEST_CANCEL, RESOLVED_ERROR } from '@/utils/handleErrors'
import { cliSettings } from '@/config'

// 正在进行的请求列表,用于中断请求
export const requestCancelList: any[] = []

/**
 * 实例化一个http请求
 * @baseURL url = baseURL + request url
 * @timeout 超时时间 ms
 * @withCredentials 是否允许跨域请求携带cookie
 */
const service = axios.create({
  baseURL: cliSettings.baseUrl,
  timeout: 10000,
  withCredentials: true
})

// Request interceptors
service.interceptors.request.use(
  (config) => {
    // Add token header to every request, you can add other custom headers here
    if (UserModule.token) {
      config.headers['X-Token'] = UserModule.token
    }
    // 保留正在进行的请求
    config.cancelToken = new axios.CancelToken(cancel => {
      requestCancelList.push({ cancel })
    })

    return config
  },
  (error) => {
    if (axios.isCancel(error)) {
      return Promise.reject(REQUEST_CANCEL)
    }
    return Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  (response) => {
    // Some example codes here:
    // code == 20000: success
    // code == 50001: invalid access token
    // code == 50002: already login in other place
    // code == 50003: access token expired
    // code == 50004: invalid user (user not exist)
    // code == 50005: username or password is incorrect
    // You can change this part for your own usage.
    // 根据api实际情况自行判断
    const res = response.data

    switch (res.code) {
      case 20000:
        return res
      case 50001: case 50003:
        uni.showModal({
          title: '提示',
          content: '登录凭证失效，请重新登录!',
          showCancel: false,
          complete: function() {
            UserModule.ResetToken()
          }
        })
        break
      case 50002:
        uni.showModal({
          title: '提示',
          content: '您的账号已在别的设备上登录，请重新登录!',
          showCancel: false,
          complete: function() {
            UserModule.ResetToken()
          }
        })
        break
      case 50004:
        uni.showModal({
          title: '提示',
          content: '用户不存在,请重新登录!',
          showCancel: false,
          complete: function() {
            UserModule.ResetToken()
          }
        })
        break
      default:
        uni.showToast({
          title: res.message,
          icon: 'none',
          duration: 1500
        })
        break
    }
    return Promise.reject(RESOLVED_ERROR)
  },
  (error) => {
    if (axios.isCancel(error)) {
      return Promise.reject(REQUEST_CANCEL)
    }
    return Promise.reject(error)
  }
)

export default service
