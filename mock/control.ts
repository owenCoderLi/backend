import { Request, Response } from 'express';
import {SearchInterface} from '@/services/Control.d';

const treeData = [
  {
    key: "1", title: "会员管理", value: "1",
    hasChild: true, hasParent: false,
    data: {
      createTime: '2019-12-23', icon: 'UserOutlined', value: '1',
      menuName: '会员管理', orderNum: 1, parentId: "0", type: "0", url: "/member"
    },
    children: [
      {
        key: "3", title: "身份认证", hasChild: true, hasParent: true,
        parentId: "1", url: "/member/identity", value: "3",
        data: {
          createTime: "2019-12-27 16:47:13",
          icon: "", value: "3", menuName: "身份认证",
          orderNum: 1, parentId: "1", perms: "identity:view",
          type: "0", url: "/member/identity", component: "./Member/identity"
        },
        children: [
          {
            key: "9", title: "编辑会员", hasParent: true,
            hasChild: false, parentId: "3", children: [],
            data: {
              createTime: "2019-12-27 17:02:58", icon: null,
              value: "9", menuName: "编辑会员", orderNum: null,
              parentId: "3", perms: "user:edit", type: "1"
            }
          },
          {
            key: "10", title: "发送短信", hasParent: true,
            hasChild: false, parentId: "3", children: [],
            data: {
              createTime: "2020-02-27 19:12:58", icon: null,
              value: "10", menuName: "发送短信", orderNum: null,
              parentId: "3", perms: "user:send", type: "1"
            }
          }
        ]
      },
      {
        key: "4", title: "搜索会员", hasChild: true, hasParent: true,
        value: "4", parentId: "1", url: "/member/search",
        data: {
          createTime: "2020-04-27 16:47:13",
          icon: "", value: "4", menuName: "搜索会员",
          orderNum: 1, parentId: "1", perms: "identity:search",
          type: "0", url: "/member/search", component: "/Member/identity",
        },
        children: [
          {
            key: "11", title: "查看", hasParent: true,
            hasChild: false, parentId: "4", children: [],
            data: {
              createTime: "2019-09-12 17:02:58", icon: null,
              value: "11", menuName: "查看", orderNum: null,
              parentId: "4", perms: "user:saw", type: "1"
            }
          },
        ]
      }
    ]
  },
  {
    key: "2", title: "管理中心", value: "2",
    hasChild: true, hasParent: false,
    data: {
      createTime: '2019-12-23', icon: 'ControlOutlined', value: '2',
      menuName: '管理中心', orderNum: 1, parentId: "0", type: "0", url: "/controls"
    },
    children: [
      {
        key: "5", title: "用户管理", hasChild: true, hasParent: true,
        value: "5", parentId: "2", url: "/controls/user",
        data: {
          createTime: "2019-12-27 16:47:13",
          icon: "", value: "5", menuName: "用户管理",
          orderNum: 1, parentId: "2", perms: "controls:user",
          type: "0", url: "/controls/user", component: "/Member/identity",
        },
        children: [
          {
            key: "12", title: "新增用户", hasParent: true,
            hasChild: false, parentId: "5", children: [],
            data: {
              createTime: "2019-12-27 17:02:58", icon: null,
              value: "12", menuName: "新增用户", orderNum: null,
              parentId: "5", perms: "user:add", type: "1"
            }
          },
          {
            key: "13", title: "删除用户", hasParent: true,
            hasChild: false, parentId: "5", children: [],
            data: {
              createTime: "2019-12-27 17:02:58", icon: null,
              value: "13", menuName: "删除用户", orderNum: null,
              parentId: "5", perms: "user:del", type: "1"
            }
          },
          {
            key: "14", title: "编辑用户", hasParent: true,
            hasChild: false, parentId: "5", children: [],
            data: {
              createTime: "2019-12-27 17:02:58", icon: null,
              value: "14", menuName: "编辑用户", orderNum: null,
              parentId: "5", perms: "user:edit", type: "1"
            }
          },
        ]
      },
      {
        key: "6", title: "角色管理", hasChild: true, hasParent: true,
        value: "6", parentId: "2", url: "/controls/role",
        data: {
          createTime: "2019-12-27 16:47:13",
          icon: "", value: "6", menuName: "角色管理",
          orderNum: 2, parentId: "2", perms: "controls:role",
          type: "0", url: "/controls/role", component: "/Member/identity",
        },
        children: [
          {
            key: "15", title: "新增角色",
            hasChild: false, parentId: "6", children: [],
            data: {
              createTime: "2019-12-27 17:02:58", icon: null,
              value: "15", menuName: "新增角色", orderNum: null,
              parentId: "6", perms: "role:add", type: "1"
            }
          },
          {
            key: "16", title: "删除角色",
            hasChild: false, parentId: "6", children: [],
            data: {
              createTime: "2019-12-27 17:02:58", icon: null,
              value: "16", menuName: "删除角色", orderNum: null,
              parentId: "6", perms: "role:del", type: "1"
            }
          },
          {
            key: "17", title: "编辑角色",
            hasChild: false, parentId: "6", children: [],
            data: {
              createTime: "2019-12-27 17:02:58", icon: null,
              value: "17", menuName: "编辑角色", orderNum: null,
              parentId: "6", perms: "role:edit", type: "1"
            }
          },
        ]
      },
      {
        key: "7", title: "菜单管理",
        hasChild: true, hasParent: true,
        value: "7", parentId: "2", url: "/controls/menu",
        data: {
          createTime: "2019-12-27 16:47:13",
          icon: "", value: "7", menuName: "角色管理",
          orderNum: 3, parentId: "2", perms: "controls:menu",
          type: "0", url: "/controls/menu", component: "/Member/identity",
        },
        children: [
          {
            key: "18", title: "新增菜单",
            hasChild: false, parentId: "7", children: [],
            data: {
              createTime: "2019-12-27 17:02:58", icon: null,
              value: "18", menuName: "新增菜单", orderNum: null,
              parentId: "7", perms: "menu:add", type: "1"
            }
          },
          {
            key: "19", title: "删除菜单",
            hasChild: false, parentId: "7", children: [],
            data: {
              createTime: "2019-12-27 17:02:58", icon: null,
              value: "19", menuName: "新增菜单", orderNum: null,
              parentId: "7", perms: "menu:del", type: "1"
            }
          },
          {
            key: "20", title: "编辑菜单",
            hasChild: false, parentId: "7", children: [],
            data: {
              createTime: "2019-12-27 17:02:58", icon: null,
              value: "20", menuName: "编辑菜单", orderNum: null,
              parentId: "7", perms: "menu:edit", type: "1"
            }
          },
        ]
      },
      {
        key: "8", title: "部门管理",
        hasChild: true, hasParent: true,
        value: "8", parentId: "2", url: "/controls/dept",
        data: {
          createTime: "2019-12-27 16:47:13",
          icon: "", value: "8", menuName: "部门管理",
          orderNum: 4, parentId: "2", perms: "controls:dept",
          type: "0", url: "/controls/dept", component: "/Member/identity",
        },
        children: [
          {
            key: "21", title: "新增部门",
            hasChild: false, parentId: "8", children: [],
            data: {
              createTime: "2019-12-27 17:02:58", icon: null,
              value: "21", menuName: "新增部门", orderNum: null,
              parentId: "8", perms: "dept:add", type: "1"
            }
          },
          {
            key: "22", title: "删除部门",
            hasChild: false, parentId: "8", children: [],
            data: {
              createTime: "2019-12-27 17:02:58", icon: null,
              value: "22", menuName: "删除部门", orderNum: null,
              parentId: "8", perms: "dept:del", type: "1"
            }
          },
          {
            key: "23", title: "编辑部门",
            hasChild: false, parentId: "8", children: [],
            data: {
              createTime: "2019-12-27 17:02:58", icon: null,
              value: "23", menuName: "编辑部门", orderNum: null,
              parentId: "8", perms: "dept:edit", type: "1"
            }
          },
        ]
      }
    ]
  },
]

const userList = (current: number, pageSize: number) => {
  const userListData: SearchInterface[] = [];
  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 20 + i;
    userListData.push({
      id: index,
      name: `Name ${index}`,
      department: Math.floor(Math.random() * 4) + 1,
      phone: `139293221${Math.round(Math.random() * 80 + 18)}`,
      email: `test${index}@yuediaoyan.com`,
      register: new Date(),
      status: Math.floor(Math.random() * 2) + 1,
    });
  }
  return userListData;
};

let userListData = userList(1, 100);

function usersRule(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  let dataSource = [...userListData].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  const result = {
    data: dataSource,
    total: 100,
    code: 0,
    msg: 'success',
  };
  return res.json(result);
}

function menuRule(req: Request, res: Response, u: string, b: Request) {
  const result = {
    data: treeData,
    code: 0,
    msg: 'success'
  }
  return res.json(result);
}

export default {
  'GET /api/controls/user_list': usersRule,
  'GET /api/controls/menus': menuRule,
};