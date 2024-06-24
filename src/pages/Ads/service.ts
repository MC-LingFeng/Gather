import { request } from '@umijs/max';
import { AdsType } from './type';

export default {
  async getAdsList(params?: AdsType) {
    return request<APIBody<AdsType[]>>('/gather/ads/list', { method: 'GET', params });
  },

  async createAds(data: AdsType) {
    return request('/gather/ads/create', {
      method: 'POST',
      data,
    });
  },
  async deleteAds(data: AdsType) {
    return request(`/gather/ads/delete`, {
      method: 'POST',
      data,
    });
  },
}