import React, {useState} from 'react';
import {useModel} from 'umi';
import {PageContainer} from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import {Button, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {useRequest, useUnmount, useMount, useThrottleFn} from 'ahooks';
import RoleModalComponent from './components/roleModal';
import {
  queryMenuList, queryRoleList,
  queryCreateRole, queryUpdateRole
} from '@/services/controlService';
import {hasPerms} from '@/utils/tools';

// 角色管理
const ControlRolePage: React.FC<{}> = () => {
  const {initialState} = useModel('@@initialState');
  const [modalVisible, setModalVisible] = useState<boolean>(false); // 弹窗显示
  const [operType, setOperType] = useState<number>(0); // 操作类型 0新建 1编辑
  const [editPerm, setEditPerm] = useState<boolean>(false); // 编辑权限: true允许 false禁止
  const [createPerm, setCreatePerm] = useState<boolean>(false); // 新增权限: true允许 false禁止
  const [treeData, setTreeData] = useState<Array<Control.MenuInterface>>([]); // 树型结构
  const [detailData, setDetailData] = useState<any>(); // 详情数据

  const columns: ProColumns<Member.MemberListInterface>[] = [
    {title: '角色id', dataIndex: 'role_id', search: false},
    {title: '角色名称', dataIndex: 'role_name', search: false},
    {title: '角色描述', dataIndex: 'description', search: false},
    {title: '角色状态', dataIndex: 'status',
      valueEnum: {
        0: { text: '启用', status: 'Success' },
        1: { text: '禁用', status: 'Error'}
      }
    },
    {title: '操作', dataIndex: 'option', valueType: 'option',
      render: (text, record) => (
        <>
          {editPerm ?
            <Button size="small" type="link" onClick={() => handleEditRole(record)}> 编辑</Button>
            : null
          }
        </>
      ),
    },
  ];

  const {run: menuRun, cancel: menuCancel} = useRequest(queryMenuList, {
    manual: true,
    throttleInterval: 600,
    onSuccess: (res) => {
      if(res.code === 0) {
        const data: Array<Control.MenuInterface> = res.data;
        setTreeData(data);
      } else {
        message.error(res.msg);
      }
    }
  })

  const {run: createRun, cancel: createCancel} = useRequest(queryCreateRole, {
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

  const {run: updateRun, cancel: updateCancel} = useRequest(queryUpdateRole, {
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

  // 获取角色列表
  const handleRequestList = async(
    params: Control.RoleInterface & {current: number; pageSize: number;}
  ) => {
    const res = await queryRoleList(params);
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
  
  // 编辑角色
  const handleEditRole = (data) => {
    setOperType(1);
    setModalVisible(true);
    setDetailData(data);
  }

  // 创建角色
  const handleCreateRole = () => {
    setOperType(0);
    setModalVisible(true);
  }

  // 提交 新增-编辑 角色表单
  const handleSubmit = (values: any) => {
    if(operType === 0 && createPerm) { // 新增状态且有创建权限
      createRun(values);
    } else if(operType === 1 && editPerm) { // 更新状态且有编辑权限
      updateRun(values);
    } else {
      message.error('抱歉,您暂无权限执行此操作');
    }
  }

  // 验证权限
  const handleOperationPermission = () => {
    const editRes = hasPerms('role:edit', initialState?.perms);
    const createRes = hasPerms('role:add', initialState?.perms);
    setEditPerm(editRes);
    setCreatePerm(createRes);
  }

  useMount(() => {
    menuRun()
    handleOperationPermission();
  })

  useUnmount(() => {
    menuCancel()
    createCancel()
    updateCancel()
  })

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        dateFormatter="string"
        headerTitle="角色列表"
        rowKey="role_id"
        request={run}
        search={{defaultCollapsed: true}}
        toolBarRender={() => [
          <div key="new">
            {createPerm ?
              <Button type="primary" onClick={handleCreateRole}>
                <PlusOutlined />新建角色
              </Button> : null
            }
          </div>
        ]}>
      </ProTable>
      {modalVisible &&
        <RoleModalComponent
          visible={modalVisible}
          treeData={treeData}
          detailData={operType === 0 ? null : detailData}
          title={operType === 0 ? "创建角色" : "编辑角色"}
          handleCancel={() => setModalVisible(false)}
          handleCheck={handleSubmit}
        />
      }
    </PageContainer>
  )
}

export default ControlRolePage;