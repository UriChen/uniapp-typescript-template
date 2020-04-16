// App
const languageKey = 'cotodo-o3-language'
export const getLanguage = () => uni.getStorageSync(languageKey)
export const setLanguage = (language: string) => uni.setStorageSync(languageKey, language)

// User
const tokenKey = 'cotodo-o3-token'
export const getToken = () => uni.getStorageSync(tokenKey)
export const setToken = (token: string) => uni.setStorageSync(tokenKey, token)
export const removeToken = () => uni.setStorageSync(tokenKey, '')
