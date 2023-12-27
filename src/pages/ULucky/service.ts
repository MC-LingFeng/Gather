import { request } from "@umijs/max";

export default {
  setmessage(data){
    const url = '/gather/setmessage';
    return request(url, { method: 'POST', data })
  }

}