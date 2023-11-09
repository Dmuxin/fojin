import request from '@/utils/request'
import { baseURLs } from '@/utils/baseUrlsConfig'

const baseUrl1 = baseURLs.baseURL1

export function getSwitch() {
  return request({
    url: `${baseUrl1}/v1/switch`,
    method: 'get'
  })
}

export function getSwitchPage(query) {
  return request({
    url: `${baseUrl1}/v1/switch/page`,
    method: 'get',
    params: query
  })
}

export function addSwitch(data) {
  return request({
    url: `${baseUrl1}/v1/switch`,
    method: 'post',
    data
  })
}

export function updateSwitch(data) {
  return request({
    url: `${baseUrl1}/v1/switch`,
    method: 'put',
    data
  })
}

export function deleteSwitch(id) {
  return request({
    url: `${baseUrl1}/v1/switch/${id}`,
    method: 'delete'
  })
}

export function batchDeleteSwitches(data) {
  return request({
    url: `${baseUrl1}/v1/switch/batchdelete`,
    method: 'delete',
    data
  })
}
