import 'dayjs/locale/zh-cn';
import { Outlet, useModel } from '@umijs/max';
import { Col, ConfigProvider, Menu, Row } from 'antd';
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
  
  return (
    <ConfigProvider theme={antdThemeConfig} locale={zhCN}>
    <div style={{ width: '100%' }}>
      <Header />
      <Row gutter={16} >
          <Col span={6} style={{ display: 'flex', justifyContent: 'flex-end',  }}>
            <div style={{ width: '40%' }}>
              <Menu {...menuProps}/>
            </div>
          </Col>
          <Col span={12}>
            <Outlet />
          </Col>
          <Col span={6}></Col>
      </Row>
    </div>
    </ConfigProvider>
  )
}

export default App