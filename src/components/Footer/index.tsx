import React from 'react';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="2020 深圳投关易科技有限公司版权所有"
    links={[
      {
        key: 'beian',
        title: '粤ICP备17116339号',
        href: 'http://beian.miit.gov.cn/',
        blankTarget: true,
      }
    ]}
  />
);
