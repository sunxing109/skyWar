import Taro from '@tarojs/taro'

/**
 * 设置认证令牌
 * @param token 认证令牌
 */
export function setToken(token) {
    try {
        Taro.setStorageSync('token', token)
     } catch (e) {
         throw e;
     }
}

/**
 * 获取认证令牌
 */
export function getToken() {
    try {   
      return Taro.getStorageSync('token')
     } catch (e) {
         throw e;
     }
}

/**
 * 是否登录
 */
export function isLogin(){
    if(getToken()){
        return true
    } else {
        return false
    }
}