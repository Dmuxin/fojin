import request from '@/utils/request'
import { baseURLs } from '@/utils/baseUrlsConfig'

const baseUrl1 = baseURLs.baseURL1

export function getGateway() {
  return request({
    url: `${baseUrl1}/v1/gateway`,
    method: 'get'
  })
}

export function getGatewayPage(query) {
  return request({
    url: `${baseUrl1}/v1/gateway/page`,
    method: 'get',
    params: query
  })
}

export function addGateway(data) {
  return request({
    url: `${baseUrl1}/v1/gateway`,
    method: 'post',
    data
  })
}

export function updateGateway(data) {
  return request({
    url: `${baseUrl1}/v1/gateway`,
    method: 'put',
    data
  })
}

export function deleteGateway(id) {
  return request({
    url: `${baseUrl1}/v1/gateway/${id}`,
    method: 'delete'
  })
}

export function batchDeleteGateways(data) {
  return request({
    url: `${baseUrl1}/v1/gateway/batchdelete`,
    method: 'delete',
    data
  })
}
