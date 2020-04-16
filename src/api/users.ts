import request from '@/utils/request'
import {
  Method,
  ILoginParams,
  ILoginResponse,
  IResponse,
  IUserInfo
} from '@/api/types'
import { handleError } from '@/utils/handleErrors'

export const login = (data: ILoginParams): Promise<ILoginResponse> => {
  return new Promise((resolve, reject) => {
    request({
      url: '/users/login',
      method: Method.POST,
      data
    })
      .then(({ data }) => {
        resolve(data)
      })
      .catch(error => {
        reject(error)
        handleError(error)
      })
  })
}

export const logout = (): Promise<IResponse> => {
  return new Promise((resolve, reject) => {
    request({
      url: '/users/logout',
      method: Method.POST
    })
      .then(({ data }) => {
        resolve(data)
      })
      .catch(error => {
        reject(error)
        handleError(error)
      })
  })
}
export const getUserInfo = (): Promise<IUserInfo> => {
  return new Promise((resolve, reject) => {
    request({
      url: '/users/userInfo',
      method: Method.GET
    })
      .then(({ data }) => {
        resolve(data)
      })
      .catch(error => {
        reject(error)
        handleError(error)
      })
  })
}

