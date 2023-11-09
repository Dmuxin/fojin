import request from '@/utils/request'
import { baseURLs } from '@/utils/baseUrlsConfig'

const baseUrl1 = baseURLs.baseURL1

export function getAllMessagePage(query) {
  return request({
    url: `${baseUrl1}/v1/message/page`,
    method: 'get',
    params: query
  })
}
