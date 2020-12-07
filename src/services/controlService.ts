import { request } from 'umi';

//  用户列表请求
export async function queryUsers(params?: Control.UserInterface) {
  return request<Control.RequestType>('/api/controls/users', {
    method: 'GET',
    params: params,
  });
}

// 用户详情请求
export async function queryUserDetail(id: string) {
  return request<Control.RequestType>(`/api/controls/detail?id=${id}`, {
    method: 'GET'
  })
}

// 菜单详情请求
export async function queryMenus() {
  return request<Control.RequestType>(`/api/controls/menus`, {
    method: 'GET'
  })
}

// 新建菜单 / 按钮 请求
export async function queryCreateMenus(params: Control.MenuInterface) {
  return request<Control.RequestType>(`/api/control/menu_add`, {
    method: 'POST',
    data: params,
  })
}

// 更新菜单 / 按钮 请求
export async function queryUpdateMenus(params: Control.MenuInterface) {
  return request<Control.RequestType>(`/api/control/menu_update`, {
    method: 'UPDATE',
    data: params
  })
}

// 新增部门请求
export async function queryCreateDept(params: Control.MenuInterface) {
  return request<Control.RequestType>(`/api/control/dept_add`, {
    method: 'POST',
    data: params
  })
}

// 更新部门请求
export async function queryUpdateDept(params: Control.MenuInterface) {
  return request<Control.RequestType>(`/api/control/dept_update`, {
    method: 'POST',
    data: params
  })
}

// 新增角色请求
export async function queryCreateRole(params: Control.MenuInterface) {
  return request<Control.RequestType>(`/api/control/role_add`, {
    method: 'POST',
    data: params
  })
}

// 更新角色请求
export async function queryUpdateRole(params: Control.MenuInterface) {
  return request<Control.RequestType>(`/api/control/role_update`, {
    method: 'POST',
    data: params
  })
}