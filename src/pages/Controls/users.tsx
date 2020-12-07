import React from 'react';
import {Link} from 'umi';
import {PageContainer} from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import {Button, Divider} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {queryUsers} from '@/services/controlService';

const columns: ProColumns<Control.UserInterface>[] = [
  {title: '用户id', dataIndex: 'id', hideInTable: true, search: false},
  {title: '姓名', dataIndex: 'name'},
  {title: '手机号', dataIndex: 'phone', hideInTable: true, search: false},
  {title: '邮箱', dataIndex: 'email', search: false},
  {title: '部门', dataIndex: 'department',
    valueEnum: {
      1: { text: '市场部', status: 'Error' },
      2: { text: '中台', status: 'Success'},
      3: { text: '运营', status: 'Warning'},
      4: { text: '技术', status: 'Default'}
    }
  },
  {title: '注册时间', dataIndex: 'register', valueType: 'dateTime', search: false},
  {title: '用户状态', dataIndex: 'status',
    valueEnum: {
      1: { text: '启用', status: 'Success' },
      2: { text: '禁用', status: 'Error'}
    }
  },
  {title: '操作', dataIndex: 'option', valueType: 'option',
    render: (text, record) => (
      <>
        <Link to={{
          pathname: '/controls/edit',
          search: `?id=${record.id}`,
        }}>编辑</Link>
        <Divider type="vertical" />
        <Button type="link">删除</Button>
      </>
    ),
  },
];

// 用户管理
const ControlUserPage: React.FC<{}> = () => {

  const handleToCreate = () => {
    console.log('-----------------------');
  }

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        dateFormatter="string"
        headerTitle="用户列表"
        rowKey="id"
        request={(params) => queryUsers(params)}
        search={{defaultCollapsed: true}}
        toolBarRender={() => [
          <Button key="new" type="primary" onClick={handleToCreate}>
            <PlusOutlined />新建用户
          </Button>
        ]}>
      </ProTable>
    </PageContainer>
  )
}

export default ControlUserPage;