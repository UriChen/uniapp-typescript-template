import Vue from 'vue'
declare module 'vue/types/vue' {

  /** 菜单按钮的布局位置信息 */
  interface Rect {
    /** 下边界坐标，单位：px */
    bottom: number
    /** 高度，单位：px */
    height: number
    /** 左边界坐标，单位：px */
    left: number
    /** 右边界坐标，单位：px */
    right: number
    /** 上边界坐标，单位：px */
    top: number
    /** 宽度，单位：px */
    width: number
  }

  interface Vue {
    $socket: any
    sockets: any
    StatusBar: number
    CustomBar: number
    Custom: Rect
  }
}
