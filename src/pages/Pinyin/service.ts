import { request} from '@umijs/max'

export default {
  getWord(word: string){
    const url = '/gather/word';
    return request(url, { url, method: 'POST', data: {word} })
  }
}