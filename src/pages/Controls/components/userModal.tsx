import React from 'react';
import {useMount, useUnmount} from 'ahooks';
import _ from 'lodash';
import {Modal, Button, Form, Input, Radio, Select, TreeSelect} from 'antd';
import styles from './style.less';

interface FormProps { // 表单对象接口
  user_id: number; // 用户id
  user_name: string; // 用户名称
  dept_id: number; // 部门id
  role_id: number; // 角色id
  department: string; // 部门id
  email: string; // 邮箱
  phone: string; // 手机号
  role: number; // 角色id
  status: number; // 状态
}

interface ModalProps { // 弹窗传入props接口
  visible: boolean; // 显示状态
  title: string; // 标题
  treeData?: any; // 菜单列表
  roleData: any; // 角色列表
  detailData?: FormProps | null; // 详情数据
  handleCancel: () => void, // 取消事件
  handleCheck: (params: FormProps) => void // 确认事件
}
const {Option} = Select;

const UserModalComponent: React.FC<ModalProps> = (props: ModalProps) => {
  const {
    visible, title, treeData, detailData, roleData,
    handleCancel, handleCheck
  } = props;
  const [form] = Form.useForm();

  const handleSubmitForm = (values: any) => {
    // console.log('+++++++++++++++++++');
    // console.log(values);
    handleCheck(values);
  }

  useMount(() => {
    if(detailData && Object.keys(detailData).length) { // 编辑模式
      form.setFieldsValue({
        user_id: detailData.user_id,
        user_name: detailData.user_name,
        role: detailData.role_id,
        status: detailData.status,
        phone: detailData.phone,
        email: detailData.email,
        department: detailData.dept_id,
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
        <Form.Item name="user_id" hidden />
        <Form.Item
          name="user_name" label="用户名称"
          rules={[{ required: true, message: '请输入用户名称' }]}>
          <Input placeholder="请输入用户名称" />
        </Form.Item>
        <Form.Item name="role" label="用户角色"
          rules={[{ required: true, message: '请选择用户角色' }]}>
          <Select>
            {roleData.map(item =>
              <Option key={item.role_id} value={item.role_id}>{item.role_name}</Option>
            )}
          </Select>
        </Form.Item>
        <Form.Item name="status" label="用户状态">
          <Radio.Group>
            <Radio value={0}>启用</Radio>
            <Radio value={1}>禁用</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="phone" label="用户手机">
          <Input placeholder="请输入用户手机号" />
        </Form.Item>
        <Form.Item name="email" label="用户邮箱">
          <Input placeholder="请输入用户邮箱" />
        </Form.Item>
        <Form.Item name="department" label="所属部门">
          <TreeSelect treeData={treeData} />
        </Form.Item>
        <Form.Item className={styles['role-footer']}>
          <Button onClick={handleCancel}>取消</Button>
          <Button className={styles['submit-btn']} htmlType="submit">确认</Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UserModalComponent;