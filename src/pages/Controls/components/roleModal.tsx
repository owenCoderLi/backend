import React, {useState} from 'react';
import {useMount} from 'ahooks';
import _ from 'lodash';
import {Modal, Button, Form, Input, Radio, Tree} from 'antd';

interface FormProps {
  perms: Array<string>;
  role_description: string;
  role_name: string;
  status: number;
}

interface ModalProps {
  visible: boolean; // 显示状态
  title: string; // 标题
  treeData?: any; // 菜单列表
  handleCancel: () => void, // 取消事件
  handleCheck: (params: FormProps) => void // 确认事件
}
const {TreeNode} = Tree;

const RoleModalComponent: React.FC<ModalProps> = (props: ModalProps) => {

  const {
    visible, title, treeData,
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
    form.setFieldsValue({
      status: 0
    })
  })

  return(
    <>
      <Modal visible={visible} title={title} footer={null}>
        <Form form={form} onFinish={handleSubmitForm}>
          <Form.Item
            name="role_name" label="角色名称"
            rules={[{ required: true, message: '请输入角色名称' }]}>
            <Input placeholder="请输入角色名称" />
          </Form.Item>
          <Form.Item name="role_description" label="角色描述"
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
              onCheck={handleTreeCheck}>
              {treeData && treeData.length > 0 ? renderTreeData(treeData) : null}
            </Tree>
          </Form.Item>
          <Form.Item>
            <Button onClick={handleCancel}>取消</Button>
            <Button type="primary" htmlType="submit">确认</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default RoleModalComponent;