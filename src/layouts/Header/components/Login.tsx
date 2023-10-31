import { Button, Form, Input, Modal, ModalProps } from 'antd'
import React from 'react'
import service from '@/services/login'
import { useRequest } from '@umijs/max';

interface LoginProps {
  modalProps: ModalProps
}
interface FieldType {
  username?: string;
  password?: string;
  remember?: string;
};
const Login: React.FC<LoginProps> = ({ modalProps }) => {
  const [form] = Form.useForm();

  const login = useRequest(service.login, { manual: true });
  const register = useRequest(service.register, { manual: true });
  
  const onFinish = (key: 'login' | 'register') => {
    const values = form.getFieldsValue();

    if (!values.username || !values.password) {
      return;
    }
    console.log(values, key,);
    if (key === 'login') {
      login.run(values);
    } else {
      register.run(values);
    }
  };
 

  return (
    <Modal
      {...modalProps}
      footer={false}
      title='登录/注册'
    >
      <Form
        form={form}
        name="gather-login"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        style={{ maxWidth: 600 }}
        initialValues={{
          username: '',
          password: '',
        }}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="用户名"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="密码"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span:12 }}>
          <Button
            type="primary"
            htmlType='submit'
            style={{ marginRight: 15 }}
            loading={login.loading}
            onClick={() => {
              onFinish('login')
            }}
            >
            登录
          </Button>
          <Button
            type="default" 
            htmlType='submit'
            loading={register.loading}
            onClick={() => {
              onFinish('register')
            }}>
            注册
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Login