import { useCssModule } from '@/hooks';
import { Col, Drawer, Row } from 'antd';
import { useState } from 'react';
import { theme } from '../helper';
import styles from './index.module.css';
import { useChangeTheme } from '../hooks';
import { useModel } from '@umijs/max';
import themeService from '@/services/theme';
import { Theme, User } from './svg';
import { Login } from './components';

const Header = () => {
  const styleCtx = useCssModule(styles);
  const username = window.sessionStorage.getItem('username');
  const [open, setOpen] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(false);
  const changeTheme = useChangeTheme();
  const { setThemeName } = useModel('theme')

  return (
    <div className={styleCtx('header-container')}>
      <Row gutter={12} style={{ height: '100%' }}>
        <Col span={6} className={styleCtx('header-left')}>
          Icon
        </Col>
        <Col span={12} className={styleCtx('header-center')}>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
        </Col>
        <Col span={6} className={styleCtx('header-center')}>
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            {!username &&
              <div style={{ marginRight: 15 }} onClick={() => setLogin(true)} className={styleCtx('hands-true')}>
                <span>登录</span>丨
                <span>注册</span>
              </div>
            }
            {
              !!username && (
                  <div style={{ marginRight: 15 }}><User /></div>
                )
            }
            
            <div
              style={{ width: '60px', cursor: 'pointer' }}
              onClick={() => setOpen(true)}
            >
              <Theme />
              <Drawer
                title="主题选择"
                placement="right"
                onClose={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                }}
                open={open}
              >
                {Object.keys(theme).map((item) => {
                  return (
                    <div
                      key={`${item}-theme-button`}
                      style={{ display: 'flex', alignItems: 'center' }}
                      onClick={(e) => {
                        setThemeName(item)
                        changeTheme(item, e)
                        themeService.setTheme({
                          value: item,
                          id: 1
                        })
                        setOpen(false)
                      }}
                    >
                      <div
                        style={{
                          width: '30px',
                          height: '30px',
                          background: item,
                          border: '1px solid #8c8c8c',
                          marginRight: 10,
                          marginBottom: 10,
                        }}
                      ></div>
                      <div>{item} 主题</div>
                    </div>
                  );
                })}
              </Drawer>
            </div>
          </div>
        </Col>
      </Row>
      <Login 
        modalProps={{
          open: login,
          onCancel: () => setLogin(false),
        }}
      />
    </div>
  );
};

export default Header;
