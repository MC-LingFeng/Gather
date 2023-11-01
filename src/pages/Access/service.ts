import { request } from '@umijs/max'

export default {
  getUser(){
    const url = '/gather/authority/user';
    return request(url, { method: 'GET' })
  }
}