import React from 'react';
import {Link} from 'umi';
import {PageContainer} from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import {Button, Divider} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {queryUserList} from '@/services/controlService';

const columns: ProColumns<Control.UserInterface>[] = [
  {title: '用户id', dataIndex: 'user_id', hideInTable: true, search: false},
  {title: '姓名', dataIndex: 'user_name'},
  {title: '手机号', dataIndex: 'phone', hideInTable: true, search: false},
  {title: '邮箱', dataIndex: 'email', search: false},
  {title: '部门', dataIndex: 'dept_name', search: false},
  {title: '用户状态', dataIndex: 'status',
    valueEnum: {
      0: { text: '启用', status: 'Success' },
      1: { text: '禁用', status: 'Error'}
    }
  },
  {title: '操作', dataIndex: 'option', valueType: 'option',
    render: (text, record) => (
      <>
        <Link to={{
          pathname: '/controls/edit',
          search: `?id=${record.user_id}`,
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
        request={async(
          params: Control.UserInterface & {
            pageSize: number;
            current: number;
          }, sort, filter
        ) => {
          const res = await queryUserList()
          return {
            data: res.data,
            success: res.code === 0,
            total: res.total
          }
        }}
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