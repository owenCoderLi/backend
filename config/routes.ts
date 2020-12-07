export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {name: '登录', path: '/user/login', component: './User/login'},
    ],
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'DashboardOutlined',
    component: './Dashboard',
  },
  {
    path: '/member',
    name: '会员管理',
    icon: 'UserOutlined',
    routes: [
      {name: '身份认证', path: '/member/identity', component: './Member/identity.tsx'},
      {name: '搜索会员', path: '/member/search', component: './Member/search.tsx'}
    ],
  },
  {
    path: '/controls',
    name: '管理中心',
    icon: 'ControlOutlined',
    routes: [
      {name: '用户管理', path: '/controls/user', component: './Controls/users.tsx'},
      {name: '角色管理', path: '/controls/role', component: './Controls/roles.tsx'},
      {name: '菜单管理', path: '/controls/menu', component: './Controls/menus.tsx'},
      {name: '部门管理', path: '/controls/dept', component: './Controls/department.tsx'},
    ],
  },
  {path: '/', redirect: '/dashboard'},
  {component: './404'},
]