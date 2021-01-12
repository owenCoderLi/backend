import React from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import {Button, Divider, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {queryIdentityList} from '@/services/memberService';

const columns: ProColumns<Member.MemberListInterface>[] = [
  {title: '用户id', dataIndex: 'id', hideInTable: true},
  {title: '姓名', dataIndex: 'name'},
  {title: '手机号', dataIndex: 'phone', hideInTable: true},
  {title: '注册时间', dataIndex: 'register', valueType: 'dateTime'},
  {title: '身份认证状态', dataIndex: 'status',
    valueEnum: {
      0: { text: '不限', status: 'Default' },
      1: { text: '认证中', status: 'Processing' },
      2: { text: '已认证', status: 'Success' },
      3: { text: '未认证', status: 'Error' },
      4: { text: '认证不通过', status: 'Error'}
    }
  },
  {title: '实名认证状态', dataIndex: 'realStatus',
    valueEnum: {
      0: { text: '不限', status: 'Default' },
      1: { text: '认证中', status: 'Processing' },
      2: { text: '已认证', status: 'Success' },
      3: { text: '未认证', status: 'Error' },
      4: { text: '认证不通过', status: 'Error'}
    }
  },
  {title: '人脸识别状态', dataIndex: 'faceStatus',
    valueEnum: {
      0: { text: '不限', status: 'Default' },
      1: { text: '认证中', status: 'Processing' },
      2: { text: '已认证', status: 'Success' },
      3: { text: '未认证', status: 'Error' },
      4: { text: '认证不通过', status: 'Error'}
    }
  },
  {title: '资产证名状态', dataIndex: 'assetStatus',
    valueEnum: {
      0: { text: '不限', status: 'Default' },
      1: { text: '认证中', status: 'Processing' },
      2: { text: '已认证', status: 'Success' },
      3: { text: '未认证', status: 'Error' },
      4: { text: '认证不通过', status: 'Error'}
    }
  },
  {title: '机构', dataIndex: 'organization'},
  {title: '身份证号', dataIndex: 'idNum', hideInTable: true,
    valueEnum: {0: {text: '未填写'}, 1: {text: '已填写'}}
  },
  {title: '机器人账号', dataIndex: 'machine', hideInTable: true,
    valueEnum: {0: {text: '否'}, 1: {text: '是'}}
  },
  {title: '虚拟号', dataIndex: 'virtual', hideInTable: true,
    valueEnum: {0: {text: '否'}, 1: {text: '是'}}
  },
  {title: '操作', dataIndex: 'option', valueType: 'option',
    render: () => (
      <>
        <a href="">编辑</a>
        <Divider type="vertical" />
        <a href="">删除</a>
        <Divider type="vertical" />
        <a href="">发短信</a>
        <Divider type="vertical" />
        <a href="">重置密码</a>
      </>
    ),
  },
];

// 身份认证
const IdentityPage: React.FC<{}> = () => {

  const handleQueryList = async(
    params: Member.MemberListInterface & {current: number; pageSize: number;}
  ) => {
    const res = await queryIdentityList(params);
    if(res.code === 0) {
      return {
        data: res.data,
        success: true,
        total: res.total
      }
    } else {
      message.error(res.msg);
      return {
        data: [], success: false, total: 0
      }
    }
  }

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        dateFormatter="string"
        headerTitle="用户列表"
        rowKey="id"
        request={handleQueryList}
        search={{defaultCollapsed: true}}
        toolBarRender={() => [
          <Button key="new" type="primary">
            <PlusOutlined />新建
          </Button>
        ]}>
      </ProTable>
    </PageContainer>
  )
}

export default IdentityPage;