import { request } from 'umi';

export async function userLogin(params: User.LoginParamsType) {
  return request<User.RequestType>('/api/user/login', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function queryCurrent() { // 获取当前用户个人信息
  return request<User.RequestType>('/api/user/info');
}
