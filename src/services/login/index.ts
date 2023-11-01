import { request } from '@umijs/max'


export default {
  login(data: { username: string; password: string }){
    const url = '/gather/login';
    return request<APIBody<{username?: string}>>(url, { method: 'POST', data })
  },

  register(data: { username: string; password: string }){
    const url = '/gather/register';
    return request<APIBody<{username?: string}>>(url, { method: 'POST', data })
  },
}