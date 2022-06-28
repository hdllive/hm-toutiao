import request from '@/utils/request'
import store from '@/store'

// 获取短信验证码
// 返回值是promise
export const getSmsCode = (mobile) => {
  return request({
    url: `/sms/codes/${mobile}`
  })
}

// 登录接口，接口文档要求传两个数据mobile,code
export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile,
      code
    }
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    url: '/user',
    headers: {
      Authorization: 'Bearer ' + store.state.user.token
    }
  })
}
