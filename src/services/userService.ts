import { request } from 'umi';

export async function userLogin(params: User.LoginParamsType) { // 登录请求
  return request<User.RequestType>('/api/user/login', {
    method: 'POST',
    data: params,
  });
}

export async function queryCurrent() { // 获取当前用户个人信息
  return request<User.RequestType>('/api/user/info');
}

export async function queryUserMenu() { // 获取当前用户路由列表
  return request<User.RequestType>('/api/user/route_menu');
}