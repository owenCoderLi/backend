declare namespace Control { // 管理中心
  export interface UserInterface { // 用户页面接口
    phone: number; // 手机号
    name: string; // 姓名
    status: number; // 用户状态
    department: string; // 部门
    register: Date; // 注册时间
    email: string; // 邮箱
    id: number; // 用户id
    current?: number | undefined; // 当前分页数
    pageSize?: number | undefined; // 单页总数
  }

  export interface DetailInterface { // 用户详情接口
    phone: number; // 手机号
    name: string; // 姓名
    status: number; // 用户状态
    role: number; // 角色
    email: string; // 邮箱
    id: number; // 用户id
  }

  export interface MenuInterface { // 菜单接口
    key: string, // 普通树的唯一标识 id
    title: string, // 树的名称
    value: string, // 搜索树的唯一标识 id
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

  export interface RequestType { // 请求响应状态
    code: number;
    msg: string;
    total?: number;
    data?: UserInterface | MenuInterface[];
  }
}