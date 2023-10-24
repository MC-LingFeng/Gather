import { antdColorKey } from '@/runtime/getInitialState';
import { useModel } from '@umijs/max';
import React from 'react'


const useChangeTheme = () => {
  const { setInitialState } = useModel('@@initialState');
  const { setName} = useModel('global')

  const changeTheme: (key: string, e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) =>void = (item, e) => {
    e.stopPropagation();
    document.documentElement.setAttribute(
      `data-theme`,
      item,
    );

    const computedStyle =
      document.documentElement.computedStyleMap();
    const defaultAntdColor: Record<string, string> = {};
    computedStyle.forEach((value, key) => {
      if (antdColorKey.includes(key)) {
        defaultAntdColor[key] = value[0].toString();
      }
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
    window.localStorage.setItem('theme', item);
  }
  return changeTheme
}

export default useChangeTheme