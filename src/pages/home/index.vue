<template>
  <view class="home-page" :style="{paddingTop: statusBarHeight + 'rpx'}">
    {{ statusBarHeight }}
  </view>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import MainMixin from '@/mixins/main'
import { Component } from 'vue-property-decorator'

@Component({
  name: 'Home'
})
export default class Home extends mixins(MainMixin) {
  onShow() {
    console.log('home show')
  }

  onShareAppMessage(options: any) {
    return {
      title: '智能消毒',
      path: '/pages/startup/index',
      imageUrl: 'https://s1.ax1x.com/2020/04/16/JkoXAP.png'
    }
  }
}
</script>

<style lang="scss">
  .home-page {
    width: 100%;
    height: 100%;
    color: $green;
  }
</style>
