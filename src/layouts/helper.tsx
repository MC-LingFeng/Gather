import { ThemeConfig, Tooltip, type MenuProps } from 'antd';
import cssVars from 'css-vars-ponyfill';
import { routeIcons } from '@/constants/tools';

type MenuItem = Required<MenuProps>['items'][number];

function transformRoutesToMenu(root: IRoute[]) {
  const result: MenuItem[] = root
    .filter((rootItem) => rootItem.show !== false)
    .map<MenuItem>((rootItem) => {
      return {
        label: (
          <Tooltip placement="right" title={rootItem.name}>
            {rootItem.name}
          </Tooltip>
        ),
        icon: rootItem.path ? routeIcons[rootItem.path] : undefined,
        path: rootItem.path,
        key: rootItem.path,
        children: rootItem?.routes
          ? transformRoutesToMenu(rootItem.routes)
          : null,
      } as MenuItem;
    });
  return result;
}

const theme: Record<string, { [key: string]: string }> = {
  white: {
    '--primary': '#91caff',
    '--background-img': `url(${require('@/assets/img/White-BG.jpg')})`,
    '--text-color': '#000000',
    '--border-color': '#8c8c8c',
    '--icon-color': '#91caff',
    '--primary-light': '#d6e4ff',
    '--module-card-background': 'rgba(255, 255, 255, 0.8)',
    '--page-background': '#f4f7fb',
    '--surface': 'rgba(255, 255, 255, 0.94)',
    '--surface-strong': '#ffffff',
    '--text-secondary': '#5f6b7a',
    '--border-subtle': 'rgba(15, 23, 42, 0.09)',
  },
  black: {
    '--primary': '#5A54F9',
    '--background-img': `url(${require('@/assets/img/Dark-BG.jpg')})`,
    '--text-color': '#ffffff',
    '--border-color': '#8c8c8c',
    '--icon-color': '#5A54F9',
    '--primary-light': '#d3adf7',
    '--module-card-background': 'rgba(62, 65, 75, 0.8)',
    '--page-background': '#10121a',
    '--surface': 'rgba(28, 31, 43, 0.94)',
    '--surface-strong': '#202431',
    '--text-secondary': '#aeb6c7',
    '--border-subtle': 'rgba(255, 255, 255, 0.1)',
  },
  blue: {
    '--primary': '#4096ff',
    '--background-img': `url(${require('@/assets/img/Blue-BG.jpg')})`,
    '--text-color': '#000000',
    '--border-color': '#8c8c8c',
    '--icon-color': '#4096ff',
    '--primary-light': '#91caff',
    '--module-card-background': 'rgba(255, 255, 255, 0.8)',
    '--page-background': '#f1f6fd',
    '--surface': 'rgba(255, 255, 255, 0.94)',
    '--surface-strong': '#ffffff',
    '--text-secondary': '#58677a',
    '--border-subtle': 'rgba(30, 64, 175, 0.1)',
  },
  pink: {
    '--primary': '#f759ab',
    '--background-img': `url(${require('@/assets/img/Pink-BG.jpg')})`,
    '--text-color': '#000000',
    '--border-color': '#8c8c8c',
    '--icon-color': '#f759ab',
    '--primary-light': '#ffadd2',
    '--module-card-background': 'rgba(255, 255, 255, 0.8)',
    '--page-background': '#fff5fa',
    '--surface': 'rgba(255, 255, 255, 0.94)',
    '--surface-strong': '#ffffff',
    '--text-secondary': '#74616d',
    '--border-subtle': 'rgba(190, 24, 93, 0.1)',
  },
  green: {
    '--primary': '#00B96B',
    '--background-img': `url(${require('@/assets/img/Green-BG.jpg')})`,
    '--text-color': '#000000',
    '--border-color': '#8c8c8c',
    '--icon-color': '#00B96B',
    '--primary-light': '#b7eb8f',
    '--module-card-background': 'rgba(255, 255, 255, 0.8)',
    '--page-background': '#f2f9f5',
    '--surface': 'rgba(255, 255, 255, 0.94)',
    '--surface-strong': '#ffffff',
    '--text-secondary': '#586b62',
    '--border-subtle': 'rgba(5, 150, 105, 0.1)',
  },
};

function changeTheme(themeObj: { [key: string]: string }) {
  cssVars({
    variables: themeObj,
    rootElement: document.documentElement,
  });
}
const getAntdStyle: (
  defaultAntdColor: Record<string, string>,
) => ThemeConfig = (defaultAntdColor: Record<string, string>) => {
  return {
    token: {
      colorPrimary: defaultAntdColor?.['--primary'],
      colorSuccess: defaultAntdColor?.['--primary'],
      colorInfo: defaultAntdColor?.['--primary'],
      wireframe: true,
      colorText: defaultAntdColor?.['--text-color'],
      borderRadius: 10,
      controlHeight: 38,
    },
    components: {
      Layout: {
        colorBgHeader: '#fff',
        colorBgTrigger: defaultAntdColor?.['--primary'],
        controlHeight: 24,
      },
      Tag: {
        colorText: '#aaa',
      },
      Segmented: {
        itemHoverColor: defaultAntdColor?.['--primary'],
      },
      Table: {
        headerBg: defaultAntdColor?.['--primary'],
        headerColor: defaultAntdColor?.['--text-color'],
        rowHoverBg: defaultAntdColor?.['--primary-light'],
      },
      FloatButton: {
        colorText: defaultAntdColor?.['--primary'],
      },
    },
  };
};
export { changeTheme, getAntdStyle, theme, transformRoutesToMenu };
