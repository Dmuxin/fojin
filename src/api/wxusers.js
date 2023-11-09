import request from '@/utils/request'
import { baseURLs } from '@/utils/baseUrlsConfig'

const baseUrl1 = baseURLs.baseURL1

export function getWxuser() {
  return request({
    url: `${baseUrl1}/v1/wxuser`,
    method: 'get'
  })
}

export function getWxuserPage(query) {
  return request({
    url: `${baseUrl1}/v1/wxuser/page`,
    method: 'get',
    params: query
  })
}

export function addWxuser(data) {
  return request({
    url: `${baseUrl1}/v1/wxuser`,
    method: 'post',
    data
  })
}

export function updateWxuser(data) {
  return request({
    url: `${baseUrl1}/v1/wxuser`,
    method: 'put',
    data
  })
}

export function deleteWxuser(id) {
  return request({
    url: `${baseUrl1}/v1/wxuser/${id}`,
    method: 'delete'
  })
}
