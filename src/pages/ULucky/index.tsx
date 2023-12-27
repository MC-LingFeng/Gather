import { Button, Form, Input } from 'antd'
import React from 'react'
import service from './service';
import { useRequest } from '@umijs/max';

const ULucky = () => {
  const [form] = Form.useForm();
  const data = useRequest(service.setmessage, { manual: true, onSuccess(res) {
    console.log(res);
    
  } })

  const onFinish = (value) => {
    data.run(value);
  }

  return (
    <div>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="name" label='名字'>
          <Input />
        </Form.Item>
        <Form.Item name="age" label='年龄'>
          <Input />
        </Form.Item>
        <Form.Item name="gender" label='性别'>
          <Input />
        </Form.Item>
        <Form.Item name="birthday" label='生辰八字'>
          <Input />
        </Form.Item>
        <Form.Item name="msg" label='最近发生让你觉得奇怪的事情'>
          <Input.TextArea />
        </Form.Item>
        <Form.Item >
          <Button type="primary" htmlType='submit'>提交</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ULucky