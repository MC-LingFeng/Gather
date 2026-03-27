import { request} from '@umijs/max'
export interface LangChainParams {
  sheng: string[];
  place: string[];
  y: string;
  m: string;
  d: string;
}


export default {
  getCity(){
    const url = '/gather/citys';
    return request<APIBody<City[]>>(url, { url, method: 'GET' })
  },
  getLangchain(params: LangChainParams){
    const url = '/gather/langchain';
    return request<APIBody<string>>(url, { url, method: 'POST', data: params })
  }
}