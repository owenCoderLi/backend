import { Request, Response } from 'express';
import {SearchParamInterface} from '@/services/Control.d';

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
  }
]

const userList = (current: number, pageSize: number) => {
  const userListData: SearchParamInterface[] = [];
  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 20 + i;
    userListData.push({
      id: index,
      name: `Name ${index}`,
      department: Math.floor(Math.random() * 4) + 1,
      phone: `139293221${Math.round(Math.random() * 80 + 18)}`,
      email: `test${index}@qq.com`,
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