import request from '@/utils/request'
import { baseURLs } from '@/utils/baseUrlsConfig'

const baseUrl1 = baseURLs.baseURL1
const baseUrl2 = baseURLs.baseURL2

export function login(data) {
  return request({
    url: `${baseUrl1}/v1/user/login`,
    method: 'post',
    data
  })
}

export function getInfo(id) {
  return request({
    url: `${baseUrl1}/v1/user/${id}`,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: `${baseUrl1}/v1/user/logout`,
    method: 'post'
  })
}

export function getAllUsersPage(query) {
  return request({
    url: `${baseUrl1}/v1/user/page`,
    method: 'get',
    params: query
  })
}

export function updateUser(data) {
  return request({
    url: `${baseUrl1}/v1/user`,
    method: 'put',
    data
  })
}

export function addUser(data) {
  return request({
    url: `${baseUrl1}/v1/user`,
    method: 'post',
    data
  })
}

export function deleteUser(id) {
  return request({
    url: `${baseUrl1}/v1/user/${id}`,
    method: 'delete'
  })
}

export function batchDeleteUsers(data) {
  return request({
    url: `${baseUrl1}/v1/user/batchdelete`,
    method: 'delete',
    data
  })
}

export function setOrderStatus(data) {
  return request({
    url: `${baseUrl2}/testUploadTemple`,
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export function addScripture(data) {
  return request({
    url: `${baseUrl2}/add-scripture`,
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export function getDiscipleList(data) {
  return request({
    url: `${baseUrl2}/disciple/web/acquire-disciple-list/1`,
    method: 'get',
    headers: {
      'Content-Type': 'text/plain'
    }
  })
}
export function getAcquire(data) {
  return request({
    url: `${baseUrl2}/scripture/web/acquire-scripture/1`,
    method: 'get',
    headers: {
      'Content-Type': 'text/plain'
    }
  })
}
export function getDiscipleAcquire(id) {
  return request({
    url: `${baseUrl2}/disciple/web/acquire-disciple/${id}`,
    method: 'get',
    headers: {
      'Content-Type': 'text/plain',
    }

  })

}
export function getUser(id) {
  return request({
    url: `${baseUrl2}/image/web/imageList/${id}`,
    method: 'get',
    headers: {
      'Content-Type': 'text/plain',
    }

  })

}
export function getImageListScripture(id) {
  return request({
    url: `${baseUrl2}/image/web/image-list-scripture/${id}`,
    method: 'get',
    headers: {
      'Content-Type': 'text/plain',
    }

  })

}

