module.exports = {
  parser: require('postcss-comment'),
  plugins: [
    require('postcss-import'),
    require('autoprefixer')({
      remove: process.env.UNI_PLATFORM !== 'h5'
    }),
    require('@dcloudio/vue-cli-plugin-uni/packages/postcss'),
    require('postcss-px2units')({
      divisor: 1,
      multiple: 1, // 倍数
      decimalPlaces: 2,
      comment: 'no', // 不转换标志
      targetUnits: 'rpx'
    })
  ]
}
