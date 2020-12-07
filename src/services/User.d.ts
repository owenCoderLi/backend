declare namespace User {
  export interface UserState { // 当前用户数据
    user_name?: string;
    user_id?: string;
    phone?: string;
    role_id?: number;
    status?: number;
    email?: string;
    access_token?: string;
  }

  export interface RequestType { // 当前用户请求状态
    code: number;
    msg: string;
    data: UserState;
  }

  export interface LoginParamsType { // 登录参数接口
    username: string;
    password: string;
  }
}
