export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  HEAD = 'HEAD',
  DELETE = 'DELETE',
  TRACE = 'TRACE',
  CONNECT = 'CONNECT',
  OPTIONS = 'OPTIONS'
}

export interface ILoginParams {
  username: string
  password: string
}

export interface IResponse {
}

export interface ILoginResponse extends IResponse {
  token: string
}

export interface IRoleData {
  key: string
  name: string
  description: string
  routes: any
}

export interface IUserInfo {
  roles: string[]
}

export interface IApkVersionInfo {
  url: string
  version: string
}

export interface IGetLocationParams {
  location:string
  get_poi: string
}
