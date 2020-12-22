declare namespace Control { // 管理中心

  export interface UserInterface { // 用户接口
    phone: number; // 手机号
    user_id: number; // 用户id
    user_name: string; // 用户名称
    role_id: number; // 角色id
    role_name: string; // 角色名称
    dept_id: number; // 部门id
    dept_name: string; // 部门名称
    status: number; // 用户状态
    email: string; // 邮箱
  }

  export interface MenuInterface { // 菜单接口
    id: string | number, // 树的唯一标识
    title: string, // 树的名称
    hasChild: boolean, // 是否有子级
    hasParent: false, // 是否有父级
    url: string, // 路由路径
    component: string, // 组件路径
    createTime: string, // 创建时间
    modifyTime: string, // 变更时间
    icon: string | undefined, // 图标
    menuName: string, // 名称 - 同title
    orderNum: number, // 排序
    parentId: string, // 父级id
    perms: string, // 权限标识
    type: string, // 类型 0菜单 1按钮
    data: MenuInterface, // 具体详情
    children: MenuInterface[] // 子级
  }

  export interface DeptInterface { // 部门接口
    dept_id: number, // 部门id
    order_num: number, // 排序位置
    parent_id: number, // 上级id
    status: number, // 状态
    dept_name: string, // 部门名称
    data?: DeptInterface, // 当前树级数据
    children?: DeptInterface[] // 子级树数据
  }

  export interface RoleInterface { // 角色接口
    role_id: number, // 角色id
    role_name: string, // 角色名称
    description: string, // 角色描述
    perms?: Array<string> | string; // 角色权限合集
    status: number, // 状态 0启用 1禁用
  }

  export interface RequestType { // 请求响应状态接口
    code: number;
    msg: string;
    total?: number;
    data?: T;
  }
}