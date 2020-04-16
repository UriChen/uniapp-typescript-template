// 默认提示信息
const DEFAULT_MESSAGE = '系统开小差'

// 错误类型
export const NETWORK_ERR = 'Network Error'
export const REQUEST_CANCEL = 'Request Cancel'
export const REQUEST_TIMEOUT = 'timeout'
export const REQUEST_404 = 'status code 404'
export const RESOLVED_ERROR = 'Error Has Been Resolved'

/**
 * @description 判断错误类型
 * @param {string} errorString
 * @param {string} errorType
 * @returns {boolean}
 */
export const hasErrorOf = (errorString: string, errorType: string): boolean => {
  return errorString.includes(errorType)
}

/**
 * @description 处理错误信息 注意: 只能在返回Promise的异步方法中,或者catch块中使用
 * @param {Error} error
 * @param {{ message: string, isCaptureError: boolean }} [options]
 */
export const handleError = (
  error: Error | string,
  options?: { message?: string; isCaptureError?: boolean }
) => {
  const {
    message = DEFAULT_MESSAGE,
    isCaptureError = true
  } = options || {}

  const errorString = error.toString()
  if (!errorString || errorString === 'Error') {
    return
  }
  let ajaxMessage = ''
  switch (true) {
    case hasErrorOf(errorString, REQUEST_CANCEL):
      return
    case hasErrorOf(errorString, RESOLVED_ERROR):
      return
    case hasErrorOf(errorString, NETWORK_ERR):
      ajaxMessage = '网络连接错误!'
      break
    case hasErrorOf(errorString, REQUEST_TIMEOUT):
      ajaxMessage = '网络请求超时!'
      break
    case hasErrorOf(errorString, REQUEST_404):
      ajaxMessage = '请求接口不存在!'
      break
    default:
      ajaxMessage = ''
  }

  if (ajaxMessage) {
    uni.showToast({
      title: ajaxMessage,
      icon: 'none',
      duration: 1500
    })
    return
  }
  uni.showToast({
    title: message || errorString,
    icon: 'none',
    duration: 1500
  })

  if (!isCaptureError) {
    throw error
  }

  console.log(error)
}
