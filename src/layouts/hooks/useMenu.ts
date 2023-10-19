import { history, useLocation, useModel } from '@umijs/max';
import { MenuProps } from 'antd';
import { useState } from 'react';

import { transformRoutesToMenu } from '../helper';

const useMenu = (mode: MenuProps['mode']): MenuProps => {
  const location = useLocation();
  const { initialState } = useModel('@@initialState');

  // transformRoutesToMenu is a helper function
  // which is used to transform routes to menu items
  const menuItems = transformRoutesToMenu(initialState?.routes || []);

  // 通过 location.pathname.split('/')[1] 获取当前路由的一级路由
  // 例如：/user/list => /user
  // 用于设置 openKeys
  const [openKeys, setOpenKeys] = useState(() => [
    `/${location.pathname.split('/')[1]}`,
  ]);

  const handleOpenMenu = (keys: string[]) => {
    setOpenKeys([keys[keys.length - 1]]);
  };

  return {
    mode,
    items: menuItems,
    openKeys,
    onOpenChange: handleOpenMenu,
    selectedKeys: [history?.location.pathname || ''],
    style: {
      // height: '100%',
      borderRight: 0,
    },
    onClick: (e) => {
      history.push(e.key);
    },
  };
};

export default useMenu;
