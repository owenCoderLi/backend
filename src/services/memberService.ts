import { request } from 'umi';

//  认证搜索请求
export async function queryIdentityList(params?: Member.MemberListInterface) {
  return request<Member.RequestType>('/api/member/identity', {
    method: 'GET',
    params: params,
  });
}

// 搜索会员请求
export async function querySearchIdentity(params?: Member.SearchParamInterface) {
  return request<Member.RequestType>('/api/member/search', {
    method: 'GET',
    params: params,
  });
}

// // 新增会员请求
// export async function addIdentity(params?: ) {

// }

// // 编辑会员请求
// export async function updateIdentity() {

// }

// 省份请求
export async function queryProvince() {
  return request<Member.RequestType>('/api/dictionary/provinces', {
    method: 'GET'
  });
}

// 城市请求
export async function queryCity(id: number) {
  return request<Member.RequestType>(`/api/dictionary/cities?province_id=${id}`, {
    method: 'GET'
  });
}

// 行业请求
export async function queryIndustry() {
  return request<Member.RequestType>(`/api/dictionary/industries`, {
    method: 'GET'
  })
}

// 股票代码搜索请求
export async function queryStock(value: string) {
  return request<Member.RequestType>(`/api/dictionary/stocks?keyword=${value}&market=1&offset=0&limit=10`, {
    method: 'GET'
  })
}