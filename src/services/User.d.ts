declare namespace User { // 当前用户接口管理
  export interface UserState { // 当前用户数据
    user_name: string; // 用户名称
    user_id: string; // 用户
    phone: string; // 手机
    role_id: number; // 角色id
    role_name: number; // 角色名称
    dept_id: number; // 部门id
    status: number;
    email: string;
    access_token: string;
  }

  export interface RequestType { // 当前用户请求状态
    code: number;
    msg: string;
    data?: T;
  }

  export interface LoginParamsType { // 登录参数接口
    phone: string;
    password: string;
  }
}
