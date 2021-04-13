import React, { useState } from 'react';
import { Form, Button, Input, message } from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import { Link, history } from 'umi';
import logo from '@/assets/yuediaoyan.jpg';
import {userLogin} from '@/services/userService';
import Footer from '@/components/Footer';
import styles from './style.less';

// 此方法会跳转到 redirect 参数所在的位置
const goto = () => {
  const { query } = history.location;
  const { redirect } = query as { redirect: string };
  window.location.href = redirect || '/';
};

const phoneReg = {
  'zh-CN': /^(\+?0?86\-?)?1[345789]\d{9}$/
};

const Login: React.FC<{}> = () => {
  const [loading, setLoading] = useState(false);

  // 登录
  const handleSubmit = async (values: User.LoginParamsType) => {
    setLoading(true);
    try {
      const res = await userLogin({ ...values });
      if (res.code === 0) {
        const data:User.UserState = res.data
        message.success('登录成功！');
        localStorage.setItem('token', data.access_token);
        goto();
      } else {
        message.error(res.msg);
      }
    } catch (error) {
      message.error('登录失败，请重试！');
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src={logo} />
            </Link>
          </div>
        </div>
        <div className={styles.main}>
          <Form onFinish={handleSubmit}>
            <Form.Item
              name="phone" validateTrigger="onBlur"
              rules={[
                {required: true, message: "请输入手机号"},
                ({}) => ({
                  validator(rule, value) {
                    if(!phoneReg['zh-CN'].test(value) && value !== '') {
                      return Promise.reject('检测手机号格式有误');
                    } else {
                      return Promise.resolve()
                    }
                  }
                })
              ]}>
              <Input
                size="large" placeholder="请输入手机号"
                prefix={<UserOutlined style={{color: '#1890FF'}} />}
              />
            </Form.Item>
            <Form.Item name="password" rules={[ {required: true, message: '请输入密码!'} ]}>
              <Input
                type="password" size="large" placeholder="请输入密码"
                prefix={<LockOutlined style={{color: '#1890FF'}} />}
              />
            </Form.Item>
            <Form.Item>
              <Button
                size="large" className={styles.submit}
                loading={loading} htmlType="submit">登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
