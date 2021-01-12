import { request } from 'umi';

//  上市公司列表请求
export async function queryCompanyList(params?: Base.CompanyInterface) {
  return request<Base.ListRequestType>('/api/data/company_list', {
    method: 'GET',
    params: params
  });
}

//  机构列表请求
export async function queryOrganizeList(params?: Base.OrganizeInterface) {
  return request<Base.ListRequestType>('/api/data/organize_list', {
    method: 'GET',
    params: params
  });
}

// 上市公司新增
export async function addCompany(params: Base.CompanyInterface) {
  return request<Base.ResponseType>('/api/data/add_company', {
    method: 'POST',
    params: params
  })
}

// 上市公司更新
export async function updateCompany(params: Base.CompanyInterface) {
  return request<Base.ResponseType>('/api/data/update_company', {
    method: 'PUT',
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

// 机构更新
export async function updateOrganize(params: Base.OrganizeInterface) {
  return request<Base.ResponseType>('/api/data/update_organize', {
    method: 'PUT',
    params: params
  })
}