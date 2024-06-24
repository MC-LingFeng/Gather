export interface AdsType {
  id?: number;
  ads_code: string;
  email: string;
  psw: string;
  status: number;
  create_time: string;
  update_time?: string;
  logout_time?: string;
  alipay_id: string;
  phone?: string;
  recovery_email?: string;
}
