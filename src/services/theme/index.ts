import {request} from '@umijs/max';
import { ThemeApi } from './type';

export default {
  getTheme(){
    const url = '/gather/theme';
    return request<APIBody<ThemeApi>>(url, { method: 'GET' })
  },
  setTheme(data: { id: number , value: string}){
    const url = '/gather/theme';
    return request<APIBody<null>>(url, { method: 'POST', data })
  }
}