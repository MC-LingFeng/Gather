import 'dayjs/locale/zh-cn';
import { Outlet, useModel } from '@umijs/max';
import { ConfigProvider, Menu } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import React from 'react';
import Header from './Header';
import useMenu from './hooks/useMenu';

const App = () => {
  dayjs.locale('zh-cn');
  const [antdThemeConfig] = useModel('theme');

  const menuProps = useMenu('inline');
  
  return (
    <ConfigProvider theme={antdThemeConfig} locale={zhCN}>
    <div style={{ width: '100%' }}>
      <Header />
      <div style={{ display: 'flex' }}>
        <div><Menu {...menuProps}/></div>
        <div><Outlet /></div>
      </div>
    </div>
    </ConfigProvider>
  )
}

export default App