import request from '@/utils/request'

// 我的频道
export const getMyChannels = () => {
  return request({
    url: 'user/channels'
  })
}
