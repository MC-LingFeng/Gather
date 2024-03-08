import { request } from '@umijs/max';

export default {
  loginout(data: { username: string }) {
    const url = '/gather/loginout';
    return request<APIBody<User[]>>(url, { method: 'POST', data });
  },
};
