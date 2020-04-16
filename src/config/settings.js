const IS_PROD = process.env.NODE_ENV === 'production'

const APP_NAME = 'cotodo-devices2'
const VERSION = '1.0.0'

const MAP_API = 'https://apis.map.qq.com/ws/geocoder/v1'
const WS_URL = 'wxs://pangu.cotodo.com/mqtt'
const LOCAL_DEVICES_KEY = 'cotodo-devices2-v1.0.0'
const QQ_MAP_KEY = 'QMFBZ-SGU63-NHE3F-37XE3-GCDWV-PXFAL'
const QQ_MAP_SECRET_KEY = 'XBT74o95eHAqoU7Cj2YUIvkyipVk91TM'

const HTTPS = true

const DEV_HOST = '127.0.0.1'
const DEV_PORT = 3000
const DEV_SERVER_PORT = 8080

const PROD_HOST = DEV_HOST // todo: 发布时要改为服务器域名
const PROD_PORT = DEV_PORT // todo: 发布时要改为服务器端口

const baseUrl = IS_PROD ? `${HTTPS ? 'https' : 'http'}://${PROD_HOST}${PROD_PORT !== 80 ? ':' + PROD_PORT : ''}` : `${HTTPS ? 'https' : 'http'}://${DEV_HOST}${DEV_PORT !== 80 ? ':' + DEV_PORT : ''}`

const prodSettings = {
  name: APP_NAME, // 项目名
  title: APP_NAME, // 网页标题
  version: VERSION, // 版本号
  https: HTTPS, // 是否开启https
  host: PROD_HOST, // 域名
  port: PROD_PORT, // 端口
  baseUrl,
  assetsDir: 'static', // 静态资源目录
  publicPath: `/${APP_NAME}/`, // 服务器目录
  outputDir: `D:/WWW/${APP_NAME}${VERSION}` // 打包文件输出目录

}

const devSettings = {
  ...prodSettings,
  title: `${APP_NAME} for dev`,
  devServerPort: DEV_SERVER_PORT,
  host: DEV_HOST,
  port: DEV_PORT
}

const cliSettings = IS_PROD ? prodSettings : devSettings

const appSettings = {
  title: cliSettings.title,
  theme: 'primary',
  baseUrl,
  mapApi: MAP_API,
  wsUrl: WS_URL,
  localDevicesKey: LOCAL_DEVICES_KEY,
  mapKey: QQ_MAP_KEY,
  mapSecretKey: QQ_MAP_SECRET_KEY
}

const sentryCliSettings = {
  url: 'https://sentry.io/',
  org: 'urichen',
  project: 'vue-element-typescript-admin',
  token: '1ffcda956d5f444fba899f2c53a72b22288e22273ecc43ee81177079e0529cae',
  dsn: 'https://85b26f0175654ebd91324100ee47063c@sentry.io/2782614',
  release: APP_NAME + VERSION
}

module.exports = {
  cliSettings,
  appSettings,
  sentryCliSettings
}
