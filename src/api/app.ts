import request from '@/utils/request'
import {
  Method,
  IApkVersionInfo,
  IGetLocationParams,
  ILoginParams
} from '@/api/types'
import { handleError } from '@/utils/handleErrors'
import { appSettings } from '@/config'

const { mapApi, mapKey } = appSettings

export const getLocation = (params: IGetLocationParams) => {
  const _params = {
    ...params,
    key: mapKey
  }
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${mapApi}/`,
      data: _params,
      success: (res) => {
        resolve(JSON.parse(res.data!).result)
      },
      fail: (error) => {
        reject(error)
        handleError(error.errMsg!)
      }
    })
  })
}

export const login = (data: ILoginParams) => {
  return new Promise((resolve, reject) => {
    request({
      url: `/users/login`,
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

export const getApkVersion = (): Promise<IApkVersionInfo> => {
  return new Promise((resolve, reject) => {
    request({
      url: '/appVersion/apk',
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
