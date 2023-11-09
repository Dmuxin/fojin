import request from '@/utils/request'
import { baseURLs } from '@/utils/baseUrlsConfig'

const baseUrl1 = baseURLs.baseURL1

export function getAllAddressPage(query) {
  return request({
    url: `${baseUrl1}/v1/address/page`,
    method: 'get',
    params: query
  })
}

export function addAddress(data) {
  return request({
    url: `${baseUrl1}/v1/address`,
    method: 'post',
    data
  })
}

export function updateAddress(data) {
  return request({
    url: `${baseUrl1}/v1/address`,
    method: 'put',
    data
  })
}

export function deleteAddress(id) {
  return request({
    url: `${baseUrl1}/v1/address/${id}`,
    method: 'delete'
  })
}
