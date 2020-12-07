import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

const NoFoundPage: React.FC<{}> = () => (
  <Result
    status="404"
    title="404"
    subTitle="抱歉你所访问的页面暂无响应。请返回首页或联系管理员"
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        Back Home
      </Button>
    }
  />
);

export default NoFoundPage;
