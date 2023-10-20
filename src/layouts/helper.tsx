import { Tooltip, type MenuProps } from 'antd';
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
  },
  black: {
    '--primary': '#5A54F9',
    '--background-img': `url(${require('@/assets/img/Dark-BG.jpg')})`,
    '--text-color': '#ffffff',
    '--border-color': '#8c8c8c',
    '--icon-color': '#5A54F9',
  },
  blue: {
    '--primary': '#4096ff',
    '--background-img': `url(${require('@/assets/img/Blue-BG.jpg')})`,
    '--text-color': '#91caff',
    '--border-color': '#8c8c8c',
    '--icon-color': '#4096ff',
  },
  pink: {
    '--primary': '#f759ab',
    '--background-img': `url(${require('@/assets/img/Pink-BG.jpg')})`,
    '--text-color': '#000000',
    '--border-color': '#8c8c8c',
    '--icon-color': '#f759ab',
  },
  green: {
    '--primary': '#00B96B',
    '--background-img': `url(${require('@/assets/img/Green-BG.jpg')})`,
    '--text-color': '#000000',
    '--border-color': '#8c8c8c',
    '--icon-color': '#00B96B',
  },
}

function changeTheme(themeObj: {[key: string]: string}) {

  cssVars({
    variables: themeObj,
    rootElement: document.documentElement,
  });
}

export { transformRoutesToMenu, theme, changeTheme };
