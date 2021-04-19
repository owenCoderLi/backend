import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert } from 'antd';

export default (): React.ReactNode => (
  <PageContainer>
    <Card>
      <Alert
        message="这里是后台管理系统"
        type="success"
        showIcon banner
        style={{margin: -12, marginBottom: 24}}
      />
    </Card>
  </PageContainer>
);
