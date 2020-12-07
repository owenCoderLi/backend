import React, { useCallback } from 'react';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Spin } from 'antd';
import { history, useModel } from 'umi';
import { stringify } from 'querystring';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export interface GlobalHeaderRightProps {
  menu?: boolean;
}

// 退出登录，并且将当前的 url 保存
const loginOut = async () => {
  // await outLogin();
  localStorage.removeItem('token');
  const { query, pathname } = history.location;
  const { redirect } = query;
  // 这里有隐藏的安全隐患
  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({ redirect: pathname })
    });
  }
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const onMenuClick = useCallback(
    (event: {
      key: React.Key;
      keyPath: React.Key[];
      item: React.ReactInstance;
      domEvent: React.MouseEvent<HTMLElement>;
    }) => {
      const { key } = event;
      if (key === 'logout' && initialState) {
        setInitialState({ ...initialState, currentUser: undefined });
        loginOut();
        return;
      }
      history.push(`/account/${key}`);
    },
    [],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin size="small" style={{ margin: '0 8px'}} />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.user_name) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="center">
          <UserOutlined />个人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="logout">
        <LogoutOutlined />退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <span className={`${styles.name} anticon`}>{currentUser.user_name}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
