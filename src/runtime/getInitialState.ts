/* eslint-disable @typescript-eslint/no-unused-vars */

import { theme } from '@/layouts/helper';
import routeRequest from '@/services/routes';
import themeRequest from '@/services/theme';
import localRoutes from '../../config/routes';
import { getLocalRoutes } from './helper';

export const antdColorKey = ['--primary', '--text-color', '--primary-light'];

async function getInitialState(): Promise<InitialState> {
  const routes = getLocalRoutes(localRoutes);

  let routeData = [];
  let defaultTheme = window.localStorage.getItem('theme') || 'white';

  try {
    const [routeRes, themeRes] = await Promise.all([
      routeRequest.getPath(),
      themeRequest.getTheme(),
    ]);
    if (routeRes.code === 200) {
      routeData = routeRes.data.map((item) => {
        const nowNode =
          (routes.find((child) => child.path === item.path) as any) ?? {};
        const getChildren = item.children.map((child) => {
          const getNodeChild =
            nowNode.routes.find((node: any) => node.path === child.path) ?? {};
          return {
            ...getNodeChild,
            ...child,
          };
        });
        return {
          ...nowNode,
          ...item,
          routes: getChildren.length === 0 ? undefined : getChildren,
        };
      });
    } else {
      routeData = routes;
    }
    if (themeRes.code === 200) {
      defaultTheme = themeRes.data.value;
      window.localStorage.setItem('theme', themeRes.data.value);
      window.localStorage.setItem('theme_name', themeRes.data.name);
      window.localStorage.setItem('theme_id', `${themeRes.data.id}`);
    }
  } catch (err) {
    routeData = routes;
  }

  // type

  // console.log(res);

  const defaultAntdColor: Record<string, string> = {};
  document.documentElement.setAttribute('data-theme', defaultTheme);
  Object.keys(theme).forEach((key) => {
    const url = theme[key]['--background-img'].split('(')[1].split(')')[0];
    const img = document.createElement('img');
    img.setAttribute('key', url);
    img.setAttribute('src', url);
    img.setAttribute('style', 'display: none');
    document.documentElement.appendChild(img);
  });
  const computedStyle = document.documentElement.computedStyleMap();

  computedStyle.forEach((value, key) => {
    if (antdColorKey.includes(key)) {
      defaultAntdColor[key] = value[0].toString();
    }
  });
  // window.get
  return {
    name: 'Gutter',
    routes: routeData,
    defaultAntdColor,
    defaultTheme,
  };
}

export default getInitialState;
