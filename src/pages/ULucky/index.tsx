import { Button, Form, Input, Segmented, Select, message } from 'antd';
import React, { useEffect, useState } from 'react'
import service from './service';
import { useRequest } from '@umijs/max';
import styles from './index.module.css';
import { useCssModule } from '@/hooks';
import { useBoolean } from 'ahooks';

const ULucky = () => {
  const [form] = Form.useForm();
  const article = Form.useWatch('type', form);
  const [wss, setWss] = useState<WebSocket>();
  const [pase, setPase] = useState('')
  const [loading, loadingOpt] = useBoolean(false)

  const ctx = useCssModule(styles);
  const data = useRequest(service.setmessage, { manual: true, onSuccess(res) {
    
  } })
  const data4 = useRequest(service.setmessage4, { manual: true, onSuccess(res) {
    console.log(res);
    
  } })
  const imgData = useRequest(service.setmessageimg, { manual: true, onSuccess(res) {
    
  } })

  // useEffect(() => {
  //    const eventSource = new EventSource(`${window.location.origin}/gather/setmessage`);
  //    eventSource.onopen=(e) => {
  //     console.log('open', e);
  //   }
  //     eventSource.onmessage = function(event) {
  //       console.log('New message:', event);
  //     };
  //     eventSource.onerror = (e) => {
  //       console.log('error', e);
  //     }
  //     return () => {
  //       eventSource.close()
  //     }
  // }, [])
  useEffect(() => {
    let ws = new WebSocket(`ws://localhost:8090/gather/setmessage/ws`)
    ws.onopen = () => {
      console.log('open');
    }
    ws.onmessage = (e) => {
      if (e.data === 'end') {
        loadingOpt.setFalse()
      }
      setPase(res => {
        return `${res}${e.data}`
      })
    }
    ws.onerror = (err) => {
      console.log('err', err);
    }
    setWss(ws)
    return () => {
      ws.close();
      loadingOpt.setFalse();
    }
  }, [])

  const onFinish = async (value) => {
    setPase('')
    loadingOpt.setTrue()
    const jsonvalue = JSON.stringify({...value, start: 'pase'})
    if (wss){
      wss.send(jsonvalue)
    }
  }
  console.log(pase);
  

  return (
    <div className={ctx('center')}>
      {/* <div>吕算子——命数如织</div> */}
      <div>书香沁骨传经纬，墨影悠长舞古今</div>
      <div style={{ width: '400px'}}>
     
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="type" label='文章总类' initialValue={'散文'}>
          <Segmented 
            options={[
              { label: '议论文', value: '议论文' },
              { label: '应用文', value: '应用文' },
              { label: '记叙文', value: '记叙文' },
              { label: '说明文', value: '说明文' },
              { label: '诗歌', value: '诗歌' },
              { label: '小说', value: '小说' },
              { label: '戏剧', value: '戏剧' },
              { label: '散文', value: '散文' },
            ]}
          />
        </Form.Item>
        {/* <Form.Item name="value" label={`${article}类型`}>
            <Select 
              options={[
                { label: '写景', value: '写景' },
                { label: '写人', value: '写人' },
                { label: '记事', value: '记事' },
                { label: '状物', value: '状物' },
              ]}
            />
        </Form.Item> */}
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
          <Button type="primary" htmlType='submit' loading={data.loading || imgData.loading || data4.loading || loading}>生成文章！</Button>
        </Form.Item>
      </Form>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
        <p style ={{ whiteSpace: 'pre-wrap', width: '500px'}}>
          {!pase ? '你等会再来看看吧': pase}
        </p>
        {/* <p dangerouslySetInnerHTML={{ __html: !pase ? '你等会再来看看吧': pase }}>
        </p> */}
        {/* <p dangerouslySetInnerHTML={{ __html:data.data?.data?.[0]?.message?.content ?? '你等会再来看看吧' }}>
        </p> */}
        {/* <img src={`data:image/png;base64,${imgData?.data?.data?.data?.[0]?.b64_json ?? ''}`} width={1024} height={1792} /> */}
      </div>
    </div>
  )
}

export default ULucky