import React, {useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import {useRequest, useMount, useUnmount} from 'ahooks';
import {Button, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import UserModalComponent from './components/userModal';
import {
  queryUserList, queryDeptList, queryCreateUser,
  queryUpdateUser, queryRoleList
} from '@/services/controlService';

// 用户管理
const ControlUserPage: React.FC<{}> = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false); // 弹窗控制显示
  const [operType, setOperType] = useState<number>(0); // 操作类型 0新建 1编辑
  const [treeData, setTreeData] = useState<any>(); // 部门树形结构
  const [roleData, setRoleData] = useState<any>(); // 角色列表
  const [detailData, setDetailData] = useState<any>(); // 详情数据

  const columns: ProColumns<Control.UserInterface>[] = [
    {title: '用户id', dataIndex: 'user_id', hideInTable: true, search: false},
    {title: '姓名', dataIndex: 'user_name', search: false},
    {title: '手机号', dataIndex: 'phone', search: false},
    {title: '邮箱', dataIndex: 'email', search: false},
    {title: '角色', dataIndex: 'role_name', search: false},
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
          <Button size="small" type="link" onClick={() => handleEditUser(record)}>编辑</Button>
          <Button size="small" danger type="link">删除</Button>
        </>
      ),
    },
  ];

  const {run: deptRun, cancel: deptCancel} = useRequest(queryDeptList, {
    manual: true,
    onSuccess: (res) => {
      if(res.code === 0) {
        setTreeData(res.data);
      } else {
        message.error(res.msg);
      }
    }
  })

  const {run: roleRun, cancel: roleCancel} = useRequest(queryRoleList, {
    manual: true,
    onSuccess: (res) => {
      if(res.code === 0) {
        setRoleData(res.data);
      } else {
        message.error(res.msg);
      }
    }
  })

  const {run: createRun, cancel: createCancel} = useRequest(queryCreateUser, {
    manual: true,
    onSuccess: (res) => {
      if(res.code === 0) {
        message.success(res.msg);
        setModalVisible(false);
      } else {
        message.error(res.msg);
      }
    }
  })

  const {run: updateRun, cancel: updateCancel} = useRequest(queryUpdateUser, {
    manual: true,
    onSuccess: (res) => {
      if(res.code === 0) {
        message.success(res.msg);
        setModalVisible(false);
      } else {
        message.error(res.msg);
      }
    }
  })

  // 创建用户
  const handleToCreate = () => {
    setOperType(0);
    setModalVisible(true);
  }

  // 编辑用户
  const handleEditUser = (data) => {
    setOperType(1);
    setModalVisible(true);
    setDetailData(data);
  }

  // 提交 新增-编辑 用户表单
  const handleSubmit = (values: any) => {
    if(operType === 0) { // 新建
      createRun(values);
    } else { // 1编辑
      updateRun(values);
    }
  }

  useMount(() => {
    deptRun();
    roleRun();
  })

  useUnmount(() => {
    deptCancel()
    createCancel()
    updateCancel()
    roleCancel();
  })

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        dateFormatter="string"
        headerTitle="用户列表"
        rowKey="user_id"
        request={async(
          params: Control.UserInterface & {
            pageSize: number;
            current: number;
          }
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
      {modalVisible &&
        <UserModalComponent
          visible={modalVisible}
          treeData={treeData}
          roleData={roleData}
          detailData={operType === 0 ? null : detailData}
          title={operType === 0 ? "创建角色" : "编辑角色"}
          handleCancel={() => setModalVisible(false)}
          handleCheck={handleSubmit}
        />
      }
    </PageContainer>
  )
}

export default ControlUserPage;