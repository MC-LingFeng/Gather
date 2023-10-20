import 'dayjs/locale/zh-cn';
import { Outlet, useModel } from '@umijs/max';
import { Col, ConfigProvider, Menu, Row, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import React from 'react';
import Header from './Header';
import useMenu from './hooks/useMenu';
import styles from './index.module.css';
import { useCssModule } from '@/hooks';


const App = () => {
  dayjs.locale('zh-cn');
  const [antdThemeConfig] = useModel('theme');
  const styleCtx = useCssModule(styles)

  const menuProps = useMenu('inline');
  const {name} = useModel('global');
  console.log(name);
  
  return (
    <ConfigProvider theme={name === 'dark'? {algorithm: theme.darkAlgorithm,...antdThemeConfig }: {algorithm: theme.defaultAlgorithm, ...antdThemeConfig}} locale={zhCN} >
    <div >
      <Header />
      <Row gutter={16} >
          <Col span={6} style={{ display: 'flex', justifyContent: 'flex-end',  }}>
            <div style={{ width: '40%' }}>
              <Menu {...menuProps}/>
            </div>
          </Col>
          <Col span={12} className={styleCtx('body-container')}>
            <Outlet />
          </Col>
          <Col span={6}></Col>
      </Row>
    </div>
    </ConfigProvider>
  )
}

export default App