import { request } from 'umi';

//  机构列表请求
export async function queryOrganizeList(params?: Base.OrganizeInterface) {
  return request<Base.ListRequestType>('/api/data/organize_list', {
    method: 'GET',
    params: params
  });
}

// 行业列表请求
export async function queryIndustryList(params?: Base.IndustryInterface) {
  return request<Base.ListRequestType>('/api/data/industry_list', {
    method: 'GET',
    params: params
  })
}

// 股票代码列表请求
export async function queryStockList(params?: Base.StockInterface) {
  return request<Base.ListRequestType>('/api/data/stock_list', {
    method: 'GET',
    params: params
  })
}

// 机构新增
export async function addOrganize(params: Base.OrganizeInterface) {
  return request<Base.ResponseType>('/api/data/add_organize', {
    method: 'POST',
    params: params
  })
}

// 行业新增
export async function addIndustry(params: Base.IndustryInterface) {
  return request<Base.ResponseType>('/api/data/add_industry', {
    method: 'POST',
    params: params
  })
}

// 股票新增
export async function addStock(params: Base.StockInterface) {
  return request<Base.ResponseType>('/api/data/add_stock', {
    method: 'POST',
    params: params
  })
}

// 机构更新
export async function updateOrganize(params: Base.OrganizeInterface) {
  return request<Base.ResponseType>('/api/data/update_organize', {
    method: 'PUT',
    params: params
  })
}

// 行业更新
export async function updateIndustry(params: Base.IndustryInterface) {
  return request<Base.ResponseType>('/api/data/update_industry', {
    method: 'PUT',
    params: params
  })
}

// 股票更新
export async function updateStock(params: Base.StockInterface) {
  return request<Base.ResponseType>('/api/data/update_stock', {
    method: 'PUT',
    params: params
  })
}