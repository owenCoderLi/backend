import React, {useState} from 'react';
import {useModel} from 'umi';
import {PageContainer} from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import {useRequest, useMount, useUnmount, useThrottleFn} from 'ahooks';
import {Button, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import UserModalComponent from './components/userModal';
import {
  queryUserList, queryDeptList, queryCreateUser,
  queryUpdateUser, queryRoleList
} from '@/services/controlService';
import {hasPerms} from '@/utils/tools';

// 用户管理
const ControlUserPage: React.FC<{}> = () => {
  const {initialState} = useModel('@@initialState'); // 获取全局状态变量
  const [modalVisible, setModalVisible] = useState<boolean>(false); // 弹窗控制显示
  const [editPerm, setEditPerm] = useState<boolean>(false); // 编辑权限: true允许 false禁止
  const [createPerm, setCreatePerm] = useState<boolean>(false); // 编辑权限: true允许 false禁止
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
          {editPerm ?
            <Button size="small" type="link" onClick={() => handleEditUser(record)}>编辑</Button>
            : null
          }
        </>
      ),
    },
  ];

  const {run: deptRun, cancel: deptCancel} = useRequest(queryDeptList, {
    manual: true,
    throttleInterval: 600,
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
    throttleInterval: 600,
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
    debounceInterval: 600,
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
    debounceInterval: 600,
    onSuccess: (res) => {
      if(res.code === 0) {
        message.success(res.msg);
        setModalVisible(false);
      } else {
        message.error(res.msg);
      }
    }
  })

  // 获取用户列表
  const handleRequestList = async(
    params: Control.UserInterface & {page: number; curPage: number;}
  ) => {
    const res = await queryUserList(params);
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

  const {run} = useThrottleFn( // 列表请求节流处理
    handleRequestList,
    {wait: 600}
  )

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
    if(operType === 0 && createPerm) { // 新增状态且有创建权限
      createRun(values);
    } else if(operType === 1 && editPerm) { // 更新状态且有编辑权限
      updateRun(values);
    } else {
      message.error('抱歉,您暂无权限执行此操作');
    }
  }

  // 验证操作权限
  const handleOperationPermission = () => {
    const editRes = hasPerms('user:edit', initialState?.perms);
    const createRes = hasPerms('user:add', initialState?.perms);
    setEditPerm(editRes);
    setCreatePerm(createRes);
  }

  useMount(() => {
    deptRun();
    roleRun();
    handleOperationPermission();
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
        columnEmptyText="暂无"
        request={run}
        search={{defaultCollapsed: true}}
        toolBarRender={() => [
          <div key="new">
          {createPerm ?
            <Button type="primary" onClick={handleToCreate}>
              <PlusOutlined />新建用户
            </Button> : null
          }
          </div>
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