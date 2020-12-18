import React from 'react';
import { BasicLayoutProps, MenuDataItem, Settings as LayoutSettings } from '@ant-design/pro-layout';
import { notification } from 'antd';
import { history, RequestConfig } from 'umi';
import { RequestOptionsInit, ResponseError } from 'umi-request';
import {ControlOutlined, UserOutlined} from '@ant-design/icons';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { queryCurrent, queryUserMenu } from './services/userService';
import defaultSettings from '../config/defaultSettings';

const IconMap = { // 项目本地icon映射
  UserOutlined: <UserOutlined />,
  ControlOutlined: <ControlOutlined />
}

export async function getInitialState(): Promise<{
  settings: LayoutSettings; // 系统默认配置
  currentUser?: User.UserState; // 当前用户信息
  menuData?: MenuDataItem[]; // 菜单树
  perms?: Array<string>; // 菜单权限表
}> {
  let localId: string | null = localStorage.getItem('token') ? localStorage.getItem('token') : '';
  if(localId) { // 假设已经有缓存登录，直接加载
    const res = await queryCurrent(); // 加载用户信息
    const menuRes = await queryUserMenu(); // 加载用户路由菜单表
    if(res.code === 0) {
      return {
        menuData: menuRes.data,
        currentUser: res.data.userInfo,
        perms: res.data.perms,
        settings: defaultSettings
      }
    } else { // 获取不到个人数据(token失效)
      localStorage.clear();
      history.push('/user/login');
    }
  }
  return {
    settings: defaultSettings,
  };
}

export const layout = ({
  initialState,
}: {
  initialState: {
    settings?: LayoutSettings;
    currentUser?: User.UserState;
    menuData: any;
  }
}): BasicLayoutProps => {

  const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] =>
    menus.map(({icon, children, ...item}) => ({
      ...item,
      icon: icon && IconMap[icon as string],
      children: children && loopMenuItem(children)
    }))

  return {
    disableContentMargin: false,
    rightContentRender: () => <RightContent />,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { currentUser } = initialState;
      const { location } = history;
      if (!currentUser && location.pathname !== '/user/login') { // 如果没有登录，重定向到 login
        history.push('/user/login');
      }
    },
    menuDataRender: (menuData) => loopMenuItem(initialState.menuData || menuData),
    ...initialState?.settings,
  };
};

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

//异常处理程序
const errorHandler = (error: ResponseError) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  }

  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  throw error;
};

const requestInterceptors = (url: string, options: RequestOptionsInit) => {
  const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
  if(token) {
    const headers = {
      'Content-Type': 'application/json',
      'x-apihub-token': token,
    };
    return {
      url, options: {...options, headers}
    }
  }
  return {
    url, options: {...options}
  }
}

export const request: RequestConfig = {
  errorHandler,
  requestInterceptors: [requestInterceptors]
};
