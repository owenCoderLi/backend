export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {name: '登录', path: '/user/login', component: './User/login.tsx'},
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
      {
        name: '身份认证', path: '/member/identity',
        component: './Member/identity.tsx',
        access: 'permRouterFilter'
      },
      {
        name: '搜索会员', path: '/member/search',
        component: './Member/search.tsx',
        access: 'permRouterFilter'
      }
    ],
  },
  {
    path: '/controls',
    name: '管理中心',
    icon: 'ControlOutlined',
    routes: [
      {
        name: '用户管理', path: '/controls/user',
        component: './Controls/users.tsx',
        access: 'permRouterFilter'
      },
      {
        name: '角色管理', path: '/controls/role',
        component: './Controls/roles.tsx',
        access: 'permRouterFilter'
      },
      {
        name: '菜单管理', path: '/controls/menu',
        component: './Controls/menus.tsx',
        access: 'permRouterFilter'
      },
      {
        name: '部门管理', path: '/controls/dept',
        component: './Controls/department.tsx',
        access: 'permRouterFilter'
      },
    ],
  },
  {
    path: '/base',
    name: '基础数据',
    icon: 'SlidersOutlined',
    routes: [
      {
        name: '上市公司管理', path: '/base/company',
        component: './Base/company.tsx',
        access: 'permRouterFilter'
      },
      {
        name: '行业列表管理', path: '/base/industry',
        component: './Base/industry.tsx',
        access: 'permRouterFilter'
      },
      {
        name: '机构管理', path: '/base/organize',
        component: './Base/organize.tsx',
        access: 'permRouterFilter'
      },
      {
        name: '股票代码管理', path: '/base/stock',
        component: './Base/stock.tsx',
        access: 'permRouterFilter'
      },
    ]
  },
  {
    path: '/resource',
    name: '资源中心',
    icon: 'CodepenOutlined',
    routes: [
      {
        name: '公募基金管理人', path: '/resource/fund_manage',
        component: './Resource/fund_manage.tsx',
        access: 'permRouterFilter'
      },
      {
        name: '公募基金从业人员', path: '/resource/fund_practitioners',
        component: './Resource/fund_practitioners.tsx',
        access: 'permRouterFilter'
      },
      {
        name: '公募基金产品', path: '/resource/fund_product',
        component: './Resource/fund_product.tsx',
        access: 'permRouterFilter'
      },
      {
        name: '公募基金经理', path: '/resource/fund_manager',
        component: './Resource/fund_manager.tsx',
        access: 'permRouterFilter'
      },
      {
        name: '公募基金持仓明细', path: '/resource/fund_position',
        component: './Resource/fund_position.tsx',
        access: 'permRouterFilter'
      },
      {
        name: '私募基金产品', path: '/resource/private_product',
        component: './Resource/private_product.tsx',
        access: 'permRouterFilter'
      },
      {
        name: '私募基金管理人', path: '/resource/private_manage',
        component: './Resource/private_manage.tsx',
        access: 'permRouterFilter'
      },
      {
        name: '线下投资者名录', path: '/resource/investor_list',
        component: './Resource/investor_list.tsx',
        access: 'permRouterFilter'
      }
    ]
  },
  {path: '/', redirect: '/dashboard'},
  {component: './404'},
]