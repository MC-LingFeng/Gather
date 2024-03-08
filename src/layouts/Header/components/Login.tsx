import { Button, Form, Input, Modal, ModalProps,  } from 'antd'
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

  const login = useRequest(service.login, { manual: true, onSuccess(res) {
    if (res.code === 200 && res.data?.token) {
      window.sessionStorage.setItem('token', res.data.token);
      window.sessionStorage.setItem('username', res.data.username);
      window.location.reload();
    }
    if (res.code === 101){
      form.setFields([
        { errors: [res.message], name: 'password', value: login.params[0].password }
      ])
    }
    if (res.code === 102){
      form.setFields([
        { errors: [res.message], name: 'username', value: login.params[0].username },
        { errors: [res.message], name: 'password', value: login.params[0].password }
      ])
    }
  }, });

  const register = useRequest(service.register, { manual: true,  onSuccess(res) {
    if (res.code === 200) {
      const params = register.params[0]
      login.run(params);
    }

    if (res.code === 201) {
      /** 名字重复 */
      form.setFields([
        { errors: [res.message], name: 'username', value: register.params[0].username }
      ])
    }
  } });
  
  const onFinish = (key: 'login' | 'register') => {
    const values = form.getFieldsValue();

    if (!values.username || !values.password) {
      return;
    }

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
          <Input.Password  />
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