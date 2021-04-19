import { Space } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC<{}> = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <Space className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="站内搜索"
        options={[
          {label: <a href="https://www.baidu.com">正式版</a>, value: '测试版'},
          {label: <a href="https://www.baidu.com">测试版</a>, value: '测试版'},
          {label: <a href="https://www.baidu.com">正式版</a>, value: '正式版'},
          {label: <a href="https://www.baidu.com">测试版</a>, value: '测试版'}s
        ]}
      />
      <Avatar />
    </Space>
  );
};
export default GlobalHeaderRight;
