import request from '@/utils/request'
import { baseURLs } from '@/utils/baseUrlsConfig'

const baseUrl1 = baseURLs.baseURL1

export function getDevicebind() {
  return request({
    url: `${baseUrl1}/v1/devicebind`,
    method: 'get'
  })
}

export function getDevicebindPage(query) {
  return request({
    url: `${baseUrl1}/v1/devicebind/page`,
    method: 'get',
    params: query
  })
}

export function addDevicebind(data) {
  return request({
    url: `${baseUrl1}/v1/devicebind`,
    method: 'post',
    data
  })
}

export function updateDevicebind(data) {
  return request({
    url: `${baseUrl1}/v1/devicebind`,
    method: 'put',
    data
  })
}

export function deleteDevicebind(id) {
  return request({
    url: `${baseUrl1}/v1/devicebind/${id}`,
    method: 'delete'
  })
}
