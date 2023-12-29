import { Button, Form, Input, Segmented, Select, message } from 'antd';
import React from 'react'
import service from './service';
import { useRequest } from '@umijs/max';
import styles from './index.module.css';
import { useCssModule } from '@/hooks';

const ULucky = () => {
  const [form] = Form.useForm();
  const article = Form.useWatch('type', form);

  const ctx = useCssModule(styles);
  const data = useRequest(service.setmessage, { manual: true, onSuccess(res) {
    
  } })
  const data4 = useRequest(service.setmessage4, { manual: true, onSuccess(res) {
    
  } })
  const imgData = useRequest(service.setmessageimg, { manual: true, onSuccess(res) {
    
  } })

  const onFinish = (value) => {
    // if (!!value.img) {
    //   imgData.run({imgMsg: value.img});
    // }  else {
      // data.run(value);
    
    // }
    data4.run(value);
  }

  return (
    <div className={ctx('center')}>
      {/* <div>吕算子——命数如织</div> */}
      <div>书香沁骨传经纬，墨影悠长舞古今</div>
      <div style={{ width: '400px'}}>
     
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="type" label='文章总类' initialValue={'散文'}>
          <Segmented 
            options={[
              // { label: '议论文', value: '1' },
              // { label: '应用文', value: '2' },
              // { label: '记叙文', value: '3' },
              // { label: '说明文', value: '4' },
              // { label: '诗歌', value: '5' },
              // { label: '小说', value: '6' },
              // { label: '戏剧', value: '7' },
              { label: '散文', value: '散文' },
            ]}
          />
        </Form.Item>
        <Form.Item name="value" label={`${article}类型`}>
            <Select 
              options={[
                { label: '写景', value: '写景' },
                { label: '写人', value: '写人' },
                { label: '记事', value: '记事' },
                { label: '状物', value: '状物' },
              ]}
            />
        </Form.Item>
        <Form.Item name="name" label='文章主旨'>
          <Input />
        </Form.Item>
        {/* <Form.Item name="age" label='年龄'>
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
        </Form.Item> */}
        <Form.Item >
          <Button type="primary" htmlType='submit' loading={data.loading || imgData.loading || data4.loading}>生成文章！</Button>
        </Form.Item>
      </Form>
      </div>
      <div>
        <p dangerouslySetInnerHTML={{ __html:data4.data?.data?.[0]?.message?.content ?? '你等会再来看看吧' }}>
        </p>
        {/* <p dangerouslySetInnerHTML={{ __html:data.data?.data?.[0]?.message?.content ?? '你等会再来看看吧' }}>
        </p> */}
        <img src={`data:image/png;base64,${imgData?.data?.data?.data?.[0]?.b64_json ?? ''}`} width={1024} height={1792} />
      </div>
    </div>
  )
}

export default ULucky