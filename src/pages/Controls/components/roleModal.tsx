import React, {useState} from 'react';
import {useMount, useUnmount} from 'ahooks';
import _ from 'lodash';
import {Modal, Button, Form, Input, Radio, Tree} from 'antd';
import styles from './style.less';

interface FormProps {
  role_id: number;
  perms: Array<string>;
  role_description: string;
  role_name: string;
  status: number;
  description?: string;
}

interface ModalProps {
  visible: boolean; // 显示状态
  title: string; // 标题
  treeData?: any; // 菜单列表
  detailData?: FormProps | null; // 详情数据
  handleCancel: () => void, // 取消事件
  handleCheck: (params: FormProps) => void // 确认事件
}
const {TreeNode} = Tree;

const RoleModalComponent: React.FC<ModalProps> = (props: ModalProps) => {

  const {
    visible, title, treeData, detailData,
    handleCancel, handleCheck
  } = props;
  const [form] = Form.useForm();
  const [selectTree, setSelectTree] = useState<Array<string>>([]); // 选中树节点

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

  // 触发树复选框事件
  const handleTreeCheck = (selectedKeys: any, e: any) => {
    setSelectTree(selectedKeys.checked);
  }

  const handleSubmitForm = (values: any) => {
    const mergeResult = _.assign(values, {perms: selectTree}) // 合并表单与树节点
    handleCheck(mergeResult);
  }

  useMount(() => {
    if(detailData && Object.keys(detailData).length) { // 编辑模式
      form.setFieldsValue({
        role_id: detailData.role_id,
        status: detailData.status,
        role_name: detailData.role_name,
        description: detailData.description
      })
    } else { // 新建模式
      form.setFieldsValue({ status: 0 })
    }
  })

  useUnmount(() => {
    form.resetFields();
  })

  return(
    <Modal
      visible={visible} title={title} footer={null}
      onCancel={handleCancel}>
      <Form form={form} onFinish={handleSubmitForm}>
        <Form.Item name="role_id" hidden />
        <Form.Item
          name="role_name" label="角色名称"
          rules={[{ required: true, message: '请输入角色名称' }]}>
          <Input placeholder="请输入角色名称" />
        </Form.Item>
        <Form.Item name="description" label="角色描述"
          rules={[{ required: true, message: '请输入角色名称' }]}>
          <Input placeholder="请输入角色描述" />
        </Form.Item>
        <Form.Item name="status">
          <Radio.Group>
            <Radio value={0}>启用</Radio>
            <Radio value={1}>禁用</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="perms" label="角色权限">
          <Tree
            checkable checkStrictly
            defaultCheckedKeys={detailData && detailData['system_role_menu.menu_id'].split(',')}
            onCheck={handleTreeCheck}>
            {treeData && treeData.length > 0 ? renderTreeData(treeData) : null}
          </Tree>
        </Form.Item>
        <Form.Item className={styles['role-footer']}>
          <Button onClick={handleCancel}>取消</Button>
          <Button className={styles['submit-btn']} htmlType="submit">确认</Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default RoleModalComponent;