import React, {useState} from 'react';
import {
  Tree, TreeSelect, Form, Input,
  Radio, Button, Divider, message
} from 'antd';
import {PageContainer} from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import {useMount, useRequest, useUnmount} from 'ahooks';
import {queryMenuList, queryCreateMenus} from '@/services/controlService';

const {TreeNode} = Tree;

// 菜单管理
const ControlMenuPage: React.FC<{}> = () => {
  const [form] = Form.useForm();
  const [status, setStatus] = useState<number>(0); // 表单状态 0: 新增 1: 编辑
  const [show, setShow] = useState<boolean>(true); // 表单项显示状态
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

  const {run: submitRun, cancel: submitCancel} = useRequest(queryCreateMenus, {
    manual: true,
    onSuccess: (res) => {
      if(res.code === 0) {
        message.success(res.msg);
      } else {
        message.error(res.msg);
      }
    }
  })

  // 触发树的点击事件
  const handleTreeSelect = (selectedKeys: any, e: any) => {
    const {data} = e.node;
    handleChangeRadio(data.types);
    setStatus(1);
    form.setFieldsValue({
      icon: data.icon ? data.icon : null,
      name: data.menu_name ? data.menu_name : null,
      order: data.order_num ? data.order_num : null,
      id: data.parent_id,
      url: data.path ? data.path : null,
      type: data.types ? data.types : 0,
      perms: data.perms ? data.perms : null,
      component: data.component ? data.component : null
    })
  }

  // 触发查找树事件
  const handleEditThree = (value: string | number, node: any) => {}

  // 切换radio控制表单项
  const handleChangeRadio = (type: number) => {
    if(type === 1) { // 切换为按钮
      setShow(false);
    } else { // 切换为菜单
      setShow(true);
    }
  }

  // 渲染普通树数据
  const renderTreeData = (treeData: any) => {
    return treeData.map((item: any) => {
      if(item.children && item.children.length > 0) {
        return (
          <TreeNode key={item.id} title={item.title} data={item.data}>
            {renderTreeData(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode key={item.id} title={item.title} data={item.data} />
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

  // 表单提交
  const handleFinish = (values: any) => {
    submitRun(values);
  }

  useMount(() => {
    menuRun()
  })

  useMount(() => {
    form.setFieldsValue({ type: "0" }) // 初始化表单值
  })

  useUnmount(() => {
    menuCancel()
    submitCancel()
  })

  return (
    <PageContainer>
      <ProCard style={{ marginTop: 8 }} gutter={8} ghost>
        <ProCard colSpan={14} bordered>
          <Tree
            checkable checkStrictly
            onSelect={handleTreeSelect}>
            {treeData && treeData.length > 0 ? renderTreeData(treeData) : null}
          </Tree>
        </ProCard>
        <ProCard bordered>
          <Form labelCol={{ span: 4 }} wrapperCol={{span: 16}} form={form} onFinish={handleFinish}>
            <h3>{status === 0 ? '新增菜单' : '编辑菜单'}</h3>
            <Divider />
            <Form.Item name="id" label="上级菜单">
              <TreeSelect onSelect={handleEditThree}>
                {treeData && treeData.length > 0 ? renderSelectTreeData(treeData) : null}
              </TreeSelect>
            </Form.Item>
            <Form.Item name="name" label="名称">
              <Input placeholder="请输入菜单名称" />
            </Form.Item>
            <Form.Item name="type" label="类型">
              <Radio.Group onChange={(e) => handleChangeRadio(e.target.value)}>
                <Radio value={0}>菜单</Radio>
                <Radio value={1}>按钮</Radio>
              </Radio.Group>
            </Form.Item>
            {show ?
              <>
                <Form.Item name="icon" label="图标">
                  <Input placeholder="请输入图标名称(区分大小写)" />
                </Form.Item>
                <Form.Item name="url" label="URL">
                  <Input placeholder="请输入URL" />
                </Form.Item>
                <Form.Item name="component" label="组件名称">
                  <Input placeholder="请输入页面组件名称" />
                </Form.Item>
                <Form.Item name="order" label="排序">
                  <Input placeholder="请输入排序" />
                </Form.Item>
              </>
            : null}
            <Form.Item name="perms" label="权限">
              <Input placeholder="请输入权限, 格式为 当前页级名称:操作名称" />
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

export default ControlMenuPage;