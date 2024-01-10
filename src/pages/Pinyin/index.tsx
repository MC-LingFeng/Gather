import React, { useCallback, useMemo } from 'react'
import styles from './index.module.css'
import { useCssModule } from '@/hooks'
import { Button, Drawer, Input, Modal, Space, message } from 'antd'
import PinyinFun from 'pinyin';
import { useBoolean } from 'ahooks';
import html2canvas from 'html2canvas';
import Font from './components/Font';

interface TextItemType {
  text: string;
  pinyin: string;
  isPolyphony: boolean;
  polyphony: string[];
}
const Pinyin = () => {
  const classCtx = useCssModule(styles);
  const [text, setText] = React.useState<string>('');
  const [open, { setTrue, setFalse }] = useBoolean(false);
  const [drawer, { setTrue: setDrawerTrue, setFalse: setDrawerFalse }] = useBoolean(false);
  const [drawerState, setDrawerState] = React.useState<TextItemType|undefined>()

  const isChinese = useCallback((value: string) => {
    const reg = /^[\u4E00-\u9FA5]+$/;
    return reg.test(value);
  }, []);

  const formatText: TextItemType[] = useMemo(() => {
    const formatArr = PinyinFun(text, {
      heteronym: true,              // 启用多音字模式
      // segment: true,  
    })
    console.log(text.split(''), formatArr);
    
   return text.split('').map((item, index) => {
    const itemIsChinese = isChinese(item);
   
    if (itemIsChinese) {
      const pinyin = formatArr?.[index]
      return {
        text: item,
        pinyin: pinyin[0],
        isPolyphony: pinyin?.length > 1,
        polyphony: pinyin ?? [],
      }
    } else {
      return {
        text: item,
        pinyin: '',
        isPolyphony: false,
        polyphony: [],
      }
    }
  })
    
  }, [text])

  const onExportPicture = useCallback(() => {
    const node = document.getElementById('pinyinandhanzi') as HTMLElement;
    
    // 调用
    if (node) {
      html2canvas(node, {
        useCORS: true,
        height: node.offsetHeight,
        width: node.offsetWidth,
        scrollY: 0,
        scrollX: 0,
        backgroundColor: 'rgba(0,0,0,0)',
      }).then(async (canvas) => {
        const a = document.createElement('a'); // 创建下载链接
        a.href = canvas.toDataURL();
        a.target = '_blank'; // 新开页下载
        a.download = `${'默认图片'}.${'png'}`; // 下载文件名
        document.body.appendChild(a); // 添加dom元素
        a.click(); //  点击下载
        document.body.removeChild(a); // 下载后移除元素
        message.success('下载图片成功~');
        setFalse();
      });
    } else {
      message.error('下载失败~请联系管理员');
    }
  }, [])

  console.log(formatText);
  

  return (
    <div className={ classCtx('center')}>
      <h1 style={{ textAlign: 'center' }}>拼音</h1>
      <div className={classCtx([ 'pinyin-container'])}>
        <div style={{ width: '100%', height: '80%', background: 'transparent' }} id='pinyinandhanzi'>
            {formatText?.map((item, index) => {
              return (
                <ruby key={`${item.text}-${item.pinyin}-${index}`} style={{ padding:item.pinyin !=='' ? '5px' : '0px'}} onClick={() => {
                  setDrawerState(item)
                }}>
                  <p className={item.isPolyphony ? classCtx('hanzi-color') : ''}>{item.text}</p>
                  <rp>(</rp>
                  <rt data-pinyin={item.isPolyphony} className={classCtx('pinyin-color')}>
                    {item.pinyin}
                  </rt>
                  <rp>)</rp>
                </ruby>
            )
        })}
        </div>
        {/* <Font /> */}
        <div style={{ width: '100%', height: '20%' }}>
          <Input.TextArea 
            // autoSize
            value={text}
            style={{ width: '100%', height: 'calc(100% - 64px)' }}
              onChange={(e) => {
                console.log(e.target.value);
                
                setText(e.target.value.split(' ').join(''))
              }}
          />
        
          <Space className={classCtx('center-x')}>
              <Button onClick={() => setText('')} type='primary' danger>清空</Button>
              <Button type='primary' onClick={() => {
                setTrue()
              }}>导出</Button>
          </Space>
        </div>
      </div>
      <Drawer 
        title={drawerState?.text ?? ''}
        open={drawer}
        onClose={() => {
          setDrawerState(undefined)
          setDrawerFalse()
        }}
      >
        <Font />
      </Drawer>
      <Modal title='导出文件' open={open}>
        <div>
          <p>导出文件</p>
        </div>
        <Space>
          {/* <Button onClick={() => setFalse()}>取消</Button> */}
          <Button type='primary' onClick={onExportPicture}>导出图片</Button>
          </Space>
      </Modal>
    </div>
  )
}

export default Pinyin