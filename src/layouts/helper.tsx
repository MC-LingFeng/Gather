import { Tooltip, type MenuProps, ThemeConfig } from 'antd';
import cssVars from 'css-vars-ponyfill';


type MenuItem = Required<MenuProps>['items'][number];

function transformRoutesToMenu(root: IRoute[]) {
  const result: MenuItem[] = root.map<MenuItem>((rootItem) => {
    return {
      label: (
        <Tooltip placement="top" title={rootItem.name}>
          {rootItem.name}
        </Tooltip>
      ),
      path: rootItem.path,
      key: rootItem.path,
      children: rootItem?.routes
        ? transformRoutesToMenu(rootItem!.routes)
        : null,
    } as MenuItem;
  });
  return result;
}

const theme: Record<string, {[key: string]: string}> = {
  white: {
    '--primary': '#91caff',
    '--background-img': `url(${require('@/assets/img/White-BG.jpg')})`,
    '--text-color': '#000000',
    '--border-color': '#8c8c8c',
    '--icon-color': '#91caff',
    '--primary-light': '#d6e4ff',
    '--module-card-background': 'rgba(255, 255, 255, 0.8)',

  },
  black: {
    '--primary': '#5A54F9',
    '--background-img': `url(${require('@/assets/img/Dark-BG.jpg')})`,
    '--text-color': '#ffffff',
    '--border-color': '#8c8c8c',
    '--icon-color': '#5A54F9',
    '--primary-light': '#d3adf7',
    '--module-card-background': 'rgba(62, 65, 75, 0.8)',
  },
  blue: {
    '--primary': '#4096ff',
    '--background-img': `url(${require('@/assets/img/Blue-BG.jpg')})`,
    '--text-color': '#000000',
    '--border-color': '#8c8c8c',
    '--icon-color': '#4096ff',
    '--primary-light': '#91caff',
    '--module-card-background': 'rgba(255, 255, 255, 0.8)',
  },
  pink: {
    '--primary': '#f759ab',
    '--background-img': `url(${require('@/assets/img/Pink-BG.jpg')})`,
    '--text-color': '#000000',
    '--border-color': '#8c8c8c',
    '--icon-color': '#f759ab',
    '--primary-light': '#ffadd2',
    '--module-card-background': 'rgba(255, 255, 255, 0.8)',
  },
  green: {
    '--primary': '#00B96B',
    '--background-img': `url(${require('@/assets/img/Green-BG.jpg')})`,
    '--text-color': '#000000',
    '--border-color': '#8c8c8c',
    '--icon-color': '#00B96B',
    '--primary-light': '#b7eb8f',
    '--module-card-background': 'rgba(255, 255, 255, 0.8)',
  },
}

function changeTheme(themeObj: {[key: string]: string}) {

  cssVars({
    variables: themeObj,
    rootElement: document.documentElement,
  });
}
const getAntdStyle: (defaultAntdColor: Record<string, string>) => ThemeConfig  = (defaultAntdColor: Record<string, string>) => {
  return  {
    token: {
      colorPrimary: defaultAntdColor?.['--primary'],
      colorSuccess: defaultAntdColor?.['--primary'],
      colorInfo: defaultAntdColor?.['--primary'],
      wireframe: true,
      colorText: defaultAntdColor?.['--text-color'],
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
  }
}
export { transformRoutesToMenu, theme, changeTheme , getAntdStyle};
