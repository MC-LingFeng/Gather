import { Outlet, useLocation, useModel } from '@umijs/max';
import { ConfigProvider, Drawer, Menu, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { useEffect, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import { getAntdStyle } from './helper';
import useMenu from './hooks/useMenu';
import styles from './index.module.css';

const App = () => {
  dayjs.locale('zh-cn');
  const location = useLocation();
  const { initialState } = useModel('@@initialState');
  const { name } = useModel('global');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuProps = useMenu('inline');

  useEffect(() => setMobileMenuOpen(false), [location.pathname]);

  const antdTheme = {
    algorithm: name === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
    ...getAntdStyle(initialState?.defaultAntdColor as Record<string, string>),
  };

  return (
    <ConfigProvider theme={antdTheme} locale={zhCN}>
      <div className={styles['app-shell']}>
        <Header onOpenMenu={() => setMobileMenuOpen(true)} />
        <div className={styles.workspace}>
          <aside className={styles.sidebar} aria-label="主导航">
            <div className={styles['sidebar-inner']}>
              <Menu {...menuProps} className={styles.menu} inlineCollapsed={false} />
            </div>
          </aside>
          <div className={styles['content-column']}>
            <main className={styles['body-container']}>
              <Outlet />
            </main>
            <Footer />
          </div>
        </div>
        <Drawer
          title={<span className={styles['drawer-brand']}>Gather 导航</span>}
          placement="left"
          width={288}
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        >
          <Menu {...menuProps} className={styles['drawer-menu']} />
        </Drawer>
      </div>
    </ConfigProvider>
  );
};

export default App;
