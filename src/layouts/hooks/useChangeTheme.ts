import { antdColorKey } from '@/runtime/getInitialState';
import { useModel } from '@umijs/max';
import React from 'react';

const useChangeTheme = () => {
  const { setInitialState } = useModel('@@initialState');
  const { setName } = useModel('global');

  const changeTheme: (
    key: string,
    e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>,
  ) => void = (item, e) => {
    window.localStorage.setItem('theme', item);
    e.stopPropagation();
    document.documentElement.setAttribute(`data-theme`, item);

    const computedStyle = getComputedStyle(document.documentElement);
    const defaultAntdColor: Record<string, string> = {};
    antdColorKey.forEach((key) => {
      defaultAntdColor[key] = computedStyle.getPropertyValue(key).trim();
    });
    setInitialState((res) => {
      return { ...res, defaultAntdColor } as InitialState;
    });
    setName(() => {
      if (item === 'black') {
        return 'dark';
      } else {
        return 'light';
      }
    });
  };
  return changeTheme;
};

export default useChangeTheme;
