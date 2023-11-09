import request from '@/utils/request'
import { baseURLs } from '@/utils/baseUrlsConfig'

const baseUrl1 = baseURLs.baseURL1

export function modifypassword(data) {
  return request({
    url: `${baseUrl1}/v1/user`,
    method: 'put',
    data
  })
}
