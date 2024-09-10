import { useCssModule, useListenScroll } from '@/hooks';
import { Outlet, useModel } from '@umijs/max';
import { Col, ConfigProvider, Menu, Row, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import Header from './Header';
import Footer from './Footer';
import { getAntdStyle } from './helper';
import useMenu from './hooks/useMenu';
import styles from './index.module.css';

const App = () => {
  dayjs.locale('zh-cn');
  const { initialState } = useModel('@@initialState');
  const styleCtx = useCssModule(styles);

  const menuProps = useMenu('inline');
  const { name } = useModel('global');
  useListenScroll(styleCtx('left-menu-container'), styleCtx('menu-style'));

  return (
    <ConfigProvider
      theme={
        name === 'dark'
          ? {
              algorithm: theme.darkAlgorithm,
              ...getAntdStyle(
                initialState?.defaultAntdColor as Record<string, string>,
              ),
            }
          : {
              algorithm: theme.defaultAlgorithm,
              ...getAntdStyle(
                initialState?.defaultAntdColor as Record<string, string>,
              ),
            }
      }
      locale={zhCN}
    >
      <div style={{ width: '100%' }}>
        <Header />
        <Row gutter={16} style={{ margin: 0 }}>
          <Col span={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div className={styleCtx('left-menu-container')}>
              <Menu {...menuProps} />
            </div>
          </Col>
          <Col span={16} className={styleCtx('body-container')}>
            <Outlet />
          </Col>
          <Col span={4}></Col>
        </Row>
        <Footer />
        </div>
    </ConfigProvider>
  );
};

export default App;
