import React, {useState} from 'react';
// import {history, Link} from 'umi';
import {PageContainer} from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import {Button, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {useRequest, useUnmount, useMount} from 'ahooks';
import RoleModalComponent from './components/roleModal';
import {queryMenuList, queryRoleList, queryCreateRole} from '@/services/controlService';

const columns: ProColumns<Member.MemberInterface>[] = [
  {title: '角色id', dataIndex: 'role_id', search: false},
  {title: '角色名称', dataIndex: 'role_name'},
  {title: '角色描述', dataIndex: 'description', search: false},
  {title: '操作', dataIndex: 'option', valueType: 'option',
    render: (text, record) => (
      <>
        <Button type="link">编辑</Button>
        <Button type="link">删除</Button>
      </>
    ),
  },
];

// 角色管理
const ControlRolePage: React.FC<{}> = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false); // 弹窗显示
  const [treeData, setTreeData] = useState<Array<Control.MenuInterface>>([]); // 树型结构

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
  
  // 创建角色
  const handleVisible = (type: boolean) => {
    setModalVisible(type);  
  }

  // 提交新增角色
  const handleSubmit = (values: any) => {
    console.log('---------------');
    console.log(values);
    // createRun(values);
  }

  useMount(() => {
    menuRun()
  })

  useUnmount(() => {
    menuCancel()
    createCancel()
  })

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        dateFormatter="string"
        headerTitle="角色列表"
        rowKey="id"
        request={async(
          params: Control.RoleInterface & {
            pageSize: number;
            current: number;
          }, sort, filter
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
          <Button key="new" type="primary" onClick={() => handleVisible(true)}>
            <PlusOutlined />新建角色
          </Button>
        ]}>
      </ProTable>
      <RoleModalComponent
        visible={modalVisible}
        treeData={treeData}
        title="创建角色"
        handleCancel={() => handleVisible(false)}
        handleCheck={handleSubmit}
      />
    </PageContainer>
  )
}

export default ControlRolePage;