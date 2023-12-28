import { Button, Form, Input, message } from 'antd';
import React from 'react'
import service from './service';
import { useRequest } from '@umijs/max';
import styles from './index.module.css';
import { useCssModule } from '@/hooks';

const ULucky = () => {
  const [form] = Form.useForm();
  const ctx = useCssModule(styles);
  const data = useRequest(service.setmessage, { manual: true, onSuccess(res) {
    
  } })
  const imgData = useRequest(service.setmessageimg, { manual: true, onSuccess(res) {
    
  } })

  const onFinish = (value) => {
    if (!!value.img) {
      imgData.run({imgMsg: value.img});
    }  else {
      data.run(value);
    
    }
  }
console.log(imgData);


  return (
    <div className={ctx('center')}>
      <div>吕算子——命数如织</div>
      <div style={{ width: '400px'}}>
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
        <Form.Item name="img" label='描述一个图片'>
          <Input.TextArea />
        </Form.Item>
        <Form.Item >
          <Button type="primary" htmlType='submit' loading={data.loading || imgData.loading}>开算！</Button>
        </Form.Item>
      </Form>
      </div>
      <div>
        <p dangerouslySetInnerHTML={{ __html:data.data?.data?.[0]?.message?.content ?? '你等会再来看看吧' }}>
        </p>
        <img src={`data:image/png;base64,${imgData?.data?.data?.data?.[0]?.b64_json ?? ''}`} width={1024} height={1792} />
      </div>
    </div>
  )
}

export default ULucky