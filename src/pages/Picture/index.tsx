import { useBoolean } from 'ahooks';
import { Button, Input, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { downloadFile } from './helper';

const  Picture = () => {
  const [wss, setWss] = useState<WebSocket>();
  const [loading, loadingOpt] = useBoolean(false);
  const [text, setText] = useState('你充当Midjourney的AI程序的优化提示生成器。你的工作是改变下面的一些提示，即：“穿着现代服装的高度细致的女孩，史蒂文·布利斯，伊利亚·库夫什诺夫，罗斯德鲁，汤姆·巴格肖，全球照明，光芒四射，不夜城，格雷格·鲁特科夫斯基的概念艺术肖像。”仅改变括号中的单词(全局照明、辐射光、夜之城)，整个提示保持不变，生成更多这样的提示');
  const [base64, setBase64] = useState('');
  useEffect(() => {
    let ws = new WebSocket(
      MODE === 'dev'? `ws://localhost:8080/socket` : `wss://${window.location.host}/socket`,
    );
    // let ws = new WebSocket(`ws://localhost:8090/gather/setmessage/ws`)
    ws.onopen = () => {
      console.log('open');
    };
    ws.onmessage = (e) => {
      if (e.data === 'end' ) {
        loadingOpt.setFalse();
        
      } else {
        if  (!e.data) {
          loadingOpt.setFalse();
          message.error('生成失败');
        } else {
          const data = JSON.parse(e.data);
          setBase64(data.data.data[0].b64_json)
        }
      }
    };
    ws.onerror = (err) => {
      console.log('err', err);
    };
    setWss(ws);
    return () => {
      ws.close();
      loadingOpt.setFalse();
    };
  }, []);
const onStart = () => {
  setBase64('');
  loadingOpt.setTrue();
  const jsonvalue = JSON.stringify({ event: 'aipicture', data:{ prompt: text }  });
  if (wss) {
    wss.send(jsonvalue);
  }

}
const onDownLoad = () => {
  downloadFile(`picture${Math.random().toString().slice(2,5)}.png`, `data:image/png;base64,${base64}`);
}

  return (
    <div style={{width: '100%', height: '100vh', display: 'flex', alignItems: 'center', flexDirection: 'column'}}> 
      <div style={{ width: 500, height: 200}}>
      <Input.TextArea
        placeholder='描述一下'
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        />
        </div>
      {!!base64 && <img 
       width={1024} height={1792}
        src={ `data:image/png;base64,${base64}`}
      />}
      <div style={{ width: 40}}>
      <Button loading={loading} type='primary' onClick={onStart}>生成图片</Button>
      <Button loading={loading} type='primary' onClick={onDownLoad}>下载图片</Button>
      </div>
    </div>
  )
}

export default  Picture