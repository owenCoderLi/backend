import { request } from 'umi';

//  公募基金管理人列表请求
export async function queryFundManageList(params?: Resource.FundManageInterface) {
  return request<Resource.ListRequestType>('/api/resource/fund_manage_list', {
    method: 'GET',
    params: params
  });
}

// 公募基金经理列表请求
export async function queryFundManagerList(params?: Resource.FundManagerInterface) {
  return request<Resource.ListRequestType>('/api/resource/fund_manager_list', {
    method: 'GET',
    params: params
  })
}

// 公募基金持仓明细列表请求
export async function queryFundPositionList(params?: Resource.FundPositionInterface) {
  return request<Resource.ListRequestType>('/api/resource/fund_position_list', {
    method: 'GET',
    params: params
  })
}

// 公募基金从业人员列表请求
export async function queryFundPractitionerList(params?: Resource.FundPractitionerInterface) {
  return request<Resource.ListRequestType>('/api/resource/fund_practitioner_list', {
    method: 'GET',
    params: params
  })
}

// 公募基金产品列表请求
export async function queryFundProductList(params?: Resource.FundProductInterface) {
  return request<Resource.ListRequestType>('/api/resource/fund_product', {
    method: 'GET',
    params: params
  })
}

// 线下投资者名录列表请求
export async function queryInvestorList(params?: Resource.InvestorListInterface) {
  return request<Resource.ListRequestType>('/api/resource/invest_list', {
    method: 'GET',
    params: params
  })
}

// 私募基金管理人列表请求
export async function queryPrivateManageList(params?: Resource.PrivateManageInterface) {
  return request<Resource.ListRequestType>('/api/resource/private_manage', {
    method: 'GET',
    params: params
  })
}

// 私募基金产品列表请求
export async function queryPrivateProductList(params?: Resource.PrivateProductInterface) {
  return request<Resource.ListRequestType>('/api/resource/private_list', {
    method: 'GET',
    params: params
  })
}