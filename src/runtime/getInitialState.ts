/* eslint-disable @typescript-eslint/no-unused-vars */
import { history } from '@umijs/max';

import localRoutes from '../../config/routes';
import { getLocalRoutes } from './helper';
import { changeTheme, theme } from '@/layouts/helper';

export const antdColorKey = ['--primary', '--text-color', '--primary-light']

async function getInitialState(): Promise<InitialState> {
  const defaultAntdColor: Record<string, string> = {
   
  }
  const routes = getLocalRoutes(localRoutes);
    document.documentElement.setAttribute('data-theme', window.localStorage.getItem('theme') || 'light')
    Object.keys(theme).forEach(key => {
      const url = theme[key]['--background-img'].split('(')[1].split(')')[0]
      console.log(url);
      const img = document.createElement('img')
      img.setAttribute('key', url)
      img.setAttribute('src', url)
      img.setAttribute('style', 'display: none')
      document.documentElement.appendChild(img)
    })
  const computedStyle = document.documentElement.computedStyleMap()

  computedStyle.forEach((value, key) => {
    if (antdColorKey.includes(key)){
      defaultAntdColor[key] = value[0].toString()
    }
  })
    // console.log(document.documentElement.getAttribute(`html[data-theme="${window.localStorage.getItem('theme') || 'light'}"]`));
    
    
    // window.get
    return {
      name: 'Gutter',
      routes,
      defaultAntdColor,
    }
}

export default getInitialState;
