import React, {useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import {Button, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {useRequest, useUnmount, useMount} from 'ahooks';
import RoleModalComponent from './components/roleModal';
import {
  queryMenuList, queryRoleList,
  queryCreateRole, queryUpdateRole
} from '@/services/controlService';

// 角色管理
const ControlRolePage: React.FC<{}> = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false); // 弹窗显示
  const [operType, setOperType] = useState<number>(0); // 操作类型 0新建 1编辑
  const [treeData, setTreeData] = useState<Array<Control.MenuInterface>>([]); // 树型结构
  const [detailData, setDetailData] = useState<any>(); // 详情数据

  const columns: ProColumns<Member.MemberInterface>[] = [
    {title: '角色id', dataIndex: 'role_id', search: false},
    {title: '角色名称', dataIndex: 'role_name'},
    {title: '角色描述', dataIndex: 'description', search: false},
    {title: '操作', dataIndex: 'option', valueType: 'option',
      render: (text, record) => (
        <>
          <Button size="small" type="link" onClick={() => handleEditRole(record)}>编辑</Button>
          <Button size="small" danger type="link">删除</Button>
        </>
      ),
    },
  ];

  const {run: menuRun, cancel: menuCancel} = useRequest(queryMenuList, {
    manual: true,
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
    onSuccess: (res) => {
      if(res.code === 0) {
        message.success(res.msg);
        setModalVisible(false);
      } else {
        message.error(res.msg);
      }
    }
  })
  
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
    if(operType === 0) { // 新建
      createRun(values);
    } else { // 1编辑
      updateRun(values);
    }
  }

  useMount(() => {
    menuRun()
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
        request={async(
          params: Control.RoleInterface & {
            pageSize: number;
            current: number;
          }
        ) => {
          const res = await queryRoleList()
          return {
            data: res.data,
            success: res.code === 0,
            total: res.total
          }          
        }}
        search={{defaultCollapsed: true}}
        toolBarRender={() => [
          <Button key="new" type="primary" onClick={handleCreateRole}>
            <PlusOutlined />新建角色
          </Button>
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