import React, {useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import {Form, Tree, TreeSelect, Divider, Button, Input, message} from 'antd';
import {useMount, useUnmount, useRequest} from 'ahooks';
import {queryDeptList, queryCreateDept, queryUpdateDept} from '@/services/controlService';

interface FormProps { // 表单项接口
  id: number;
  name: string;
  order: string;
}
const {TreeNode} = Tree;

// 用户管理
const ControlDepartmentPage: React.FC<{}> = () => {
  const [form] = Form.useForm();
  const [status, setStatus] = useState<number>(0); // 表单状态 0新增 1更新
  const [treeData, setTreeData] = useState<Array<Control.DeptInterface> | undefined>(); // 树型结构

  const {run: deptRun, cancel: deptCancel} = useRequest(queryDeptList, {
    manual: true,
    onSuccess: (res) => {
      if(res.code === 0) {
        const data: Control.DeptInterface = res.data;
        setTreeData(data);
      } else {
        message.error(res.msg);
      }
    }
  })

  const {run: addRun, cancel: addCancel} = useRequest(queryCreateDept, {
    manual: true,
    onSuccess: (res) => {
      if(res.code === 0) {
        message.success(res.msg);
      } else {
        message.error(res.msg);
      }
    }
  })

  const {run: updateRun, cancel: updateCancel} = useRequest(queryUpdateDept, {
    manual: true,
    onSuccess: (res) => {
      if(res.code === 0) {
        message.success(res.msg);
      } else {
        message.error(res.msg)
      }
    }
  })

  // 渲染普通树数据
  const renderTreeData = (treeData: any) => {
    return treeData.map((item: any) => {
      if(item.children && item.children.length > 0) {
        return (
          <TreeNode key={item.id} title={item.title}>
            {renderTreeData(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode key={item.id} title={item.title} />
    })
  }

  // 渲染查找树数据
  const renderSelectTreeData = (treeData: any) => {
    return treeData.map((item: any) => {
      if(item.children && item.children.length > 0) {
        return (
          <TreeSelect.TreeNode key={item.id} value={item.id} title={item.title} data={item.data}>
            {renderSelectTreeData(item.children)}
          </TreeSelect.TreeNode>
        )
      }
      return <TreeSelect.TreeNode key={item.id} value={item.id} title={item.title} data={item.data} />
    })
  }

  const handleFormSubmit = (values: FormProps) => {
    addRun(values)
  }

  // 首次加载
  useMount(() => {
    deptRun()
  })

  // 组件卸载
  useUnmount(() => {
    deptCancel()
    addCancel()
    updateCancel()
  })

  return (
    <PageContainer>
      <ProCard style={{ marginTop: 8 }} gutter={8} ghost>
        <ProCard colSpan={14} bordered>
          <Tree checkable checkStrictly>
            {treeData && treeData.length > 0 ? renderTreeData(treeData) : null}
          </Tree>
        </ProCard>
        <ProCard bordered>
          <Form labelCol={{ span: 4 }} wrapperCol={{span: 16}} form={form} onFinish={handleFormSubmit}>
            <h3>{status === 0 ? '新增部门' : '编辑部门'}</h3>
            <Divider />
            <Form.Item name="id" label="上级部门">
              <TreeSelect treeData={treeData} />
            </Form.Item>
            <Form.Item name="name" label="部门名称">
              <Input placeholder="请输入部门名称或职级名称" />
            </Form.Item>
            <Form.Item name="order" label="部门排序">
              <Input placeholder="请输入部门排序" />
            </Form.Item>
            <Form.Item labelAlign="right" wrapperCol={{offset: 4}}>
              <Button type="primary" htmlType="submit">保存</Button>
            </Form.Item>
          </Form>
        </ProCard>
      </ProCard>
    </PageContainer>
  )
}

export default ControlDepartmentPage;