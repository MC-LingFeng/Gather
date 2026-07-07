import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import themeService from '@/services/theme';
import { useLocation, useModel } from '@umijs/max';
import { Button, Drawer, Tooltip } from 'antd';
import { useMemo, useState } from 'react';
import { theme } from '../helper';
import { useChangeTheme } from '../hooks';
import { Login, UserOperate } from './components';
import styles from './index.module.css';

interface HeaderProps { onOpenMenu: () => void; }

const themeNames: Record<string, string> = {
  white: '晨光', black: '深夜', blue: '海蓝', pink: '樱粉', green: '森绿',
};

const Header = ({ onOpenMenu }: HeaderProps) => {
  const location = useLocation();
  const username = window.sessionStorage.getItem('username');
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const changeTheme = useChangeTheme();
  const { setThemeName, themeName } = useModel('theme');
  const { initialState } = useModel('@@initialState');

  const pageTitle = useMemo(() => {
    const findName = (routes: IRoute[]): string | undefined => {
      for (const route of routes) {
        if (route.path === location.pathname) return route.name;
        const childName = route.routes ? findName(route.routes) : undefined;
        if (childName) return childName;
      }
      return undefined;
    };
    return findName(initialState?.routes || []) || '工具工作台';
  }, [initialState?.routes, location.pathname]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brandGroup}>
          <Button className={styles.menuButton} type="text" icon={<MenuOutlined />} aria-label="打开导航" onClick={onOpenMenu} />
          <div className={styles.logo} aria-hidden="true">G</div>
          <div><div className={styles.brand}>Gather</div><div className={styles.tagline}>Creative workspace</div></div>
        </div>
        <div className={styles.pageTitle}>{pageTitle}</div>
        <div className={styles.actions}>
          {!username ? (
            <Button type="text" className={styles.loginButton} onClick={() => setLogin(true)}>登录 / 注册</Button>
          ) : (
            <Tooltip arrow title={<UserOperate />} color="var(--surface-strong)" placement="bottomRight">
              <Button type="text" className={styles.iconButton} icon={<UserOutlined />} aria-label="用户菜单" />
            </Tooltip>
          )}
          <Tooltip title="切换主题">
            <Button type="text" className={styles.themeButton} aria-label="切换主题" onClick={() => setOpen(true)}>
              <span className={styles.themeDot} /><span className={styles.themeText}>{themeNames[themeName] || '主题'}</span>
            </Button>
          </Tooltip>
        </div>
      </div>
      <Drawer title="选择界面主题" placement="right" width={340} onClose={() => setOpen(false)} open={open}>
        <div className={styles.themeGrid}>
          {Object.keys(theme).map((item) => (
            <button
              type="button"
              key={`${item}-theme-button`}
              className={`${styles.themeOption} ${themeName === item ? styles.themeOptionActive : ''}`}
              onClick={(e) => {
                setThemeName(item);
                changeTheme(item, e);
                themeService.setTheme({ value: item, id: 1 });
                setOpen(false);
              }}
            >
              <span className={`${styles.preview} ${styles[`preview-${item}`]}`} />
              <span><strong>{themeNames[item]}</strong><small>{item} theme</small></span>
            </button>
          ))}
        </div>
      </Drawer>
      <Login modalProps={{ open: login, onCancel: () => setLogin(false) }} />
    </header>
  );
};

export default Header;
