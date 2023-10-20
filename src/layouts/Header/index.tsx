import React, { useState } from 'react'
import styles from './index.module.css';
import { useCssModule } from '@/hooks';
import { Col, Drawer, Row } from 'antd';
import { changeTheme, theme } from '../helper';
import { useModel } from '@umijs/max';


const Header = () => {
  const styleCtx = useCssModule(styles);
  const [open, setOpen] = useState<boolean>(false)
  const [,setTheme] = useModel('theme')
  const {setName} = useModel('global')

  return (
    <div className={styleCtx('header-container')}>
      <Row gutter={12} style={{ height: '100%' }}>
        <Col span={6} className={styleCtx('header-left')}>Icon</Col>
        <Col span={12} className={styleCtx('header-center')}>
          <div>
            1
          </div>
          <div>
            1
          </div>
          <div>
            1
          </div>
          <div>
            1
          </div>
        </Col>
        <Col span={6} className={styleCtx('header-center')}>
          <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <div style={{  width: '60px', cursor: 'pointer' }} onClick={() => setOpen(true)}>
                  主题
                <Drawer title="主题选择" placement="right" onClose={(e) => {
                  e.stopPropagation();
                  setOpen(false)
                }} open={open}>
                  {Object.keys(theme).map((item) => {
                    return <div key={`${item}-theme-button`} style={{ display: 'flex', alignItems: 'center', }} onClick={(e) => {
                      e.stopPropagation();
                      changeTheme(theme[item])
                      setTheme({
                        primaryVar: theme[item]['--primary'],
                        colorVar: theme[item]['--text-color'],
                        primaryLightVar: theme[item]['--primary-light'],
                      })
                      setOpen(false)
                        setName(() => {
                          if (item === 'black'){
                            return 'dark'
                          } else {
                            return 'light'
                          }
                        
                        })
                    }}>
                      <div style={{ width: '30px', height: '30px', background: item, border: '1px solid #8c8c8c', marginRight: 10, marginBottom: 10 }}></div>
                      <div>{item} 主题</div>
                    </div>
                  })}
                </Drawer>
            </div>
            
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Header