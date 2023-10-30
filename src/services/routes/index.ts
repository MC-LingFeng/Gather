import {request} from '@umijs/max';
import { RouteApi } from './type';

export default {
  getPath(){
    const url = '/gather/routes';
    return request<APIBody<RouteApi[]>>(url, { method: 'GET' })
  }
}