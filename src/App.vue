<script lang="ts">
import Vue from 'vue'
import { cliSettings } from '@/config'
import { getApkVersion } from '@/api/app'

export default {
  mpType: 'app',
  onLaunch() {
    console.log('app onLaunch')
    // #ifdef MP-WEIXIN
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function(res) {
        console.log('onCheckForUpdate====', res)
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          console.log('res.hasUpdate====')
          updateManager.onUpdateReady(function() {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function(res) {
                console.log('success====', res)
                // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function() {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }
      })
    }
    // #endif

    // #ifdef APP-PLUS
    plus.screen.lockOrientation('portrait-primary')

    getApkVersion().then(data => {
      if (Number(data.version.replace(/\./g, '')) - Number(cliSettings.version.replace(/\./g, '')) > 0) {
        uni.showModal({
          title: '版本更新',
          content: '有新的版本发布，是否立即进行新版本下载？',
          confirmText: '立即更新',
          cancelText: '稍后进行',
          success: function(res) {
            if (res.confirm) {
              uni.showToast({
                icon: 'none',
                mask: true,
                title: '程序已启动更新,新版本下载完成后将自动弹出安装程序',
                duration: 5000
              })
              // 设置最新版本apk的下载链接
              const downloadApkUrl = data.url
              const dtask = plus.downloader.createDownload(downloadApkUrl, {}, function(d, status) {
                // 下载完成
                if (status === 200) {
                  plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, () => {
                  }, function(error) {
                    uni.showToast({
                      title: '安装失败',
                      duration: 1500
                    })
                    console.log(error)
                  })
                } else {
                  uni.showToast({
                    title: '更新失败',
                    duration: 1500
                  })
                }
              })
              dtask.start()
            } else if (res.cancel) {
              console.log('稍后更新')
            }
          }
        })
      }
    })
    // #endif

    uni.getSystemInfo({
      success: function(e) {
        // #ifndef MP
        Vue.prototype.StatusBar = e.statusBarHeight
        if (e.platform === 'android') {
          Vue.prototype.CustomBar = e.statusBarHeight! + 50
        } else {
          Vue.prototype.CustomBar = e.statusBarHeight! + 45
        }
        // #endif

        // #ifdef MP-WEIXIN
        Vue.prototype.StatusBar = e.statusBarHeight
        const custom = wx.getMenuButtonBoundingClientRect()
        Vue.prototype.Custom = custom
        Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight!
        // #endif

        // #ifdef MP-ALIPAY
        Vue.prototype.StatusBar = e.statusBarHeight
        Vue.prototype.CustomBar = e.statusBarHeight! + e.titleBarHeight!
        // #endif
      }
    })
  }
}

</script>

<style lang="scss">
  .model-title {
    font-size: 38px;
    font-weight: 500;
    color: black;
  }

  .edit-dialog {
    top: -100px;
  }

  .nowrap-text {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .dialog-input-group {
    border: 1px solid #118aff;
    border-radius: 10px;
    min-height: 80px;
    text-align: left;

    &:last-child {
      border-top: 1px solid #118aff;
      margin-top: 10px;
    }
  }

  .padding-y-xl {
    padding: 50px 10px;
  }
</style>
