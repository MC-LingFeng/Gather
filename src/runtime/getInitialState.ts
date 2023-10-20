/* eslint-disable @typescript-eslint/no-unused-vars */
import { history } from '@umijs/max';

import localRoutes from '../../config/routes';
import { getLocalRoutes } from './helper';
import { theme } from '@/layouts/helper';


async function getInitialState(): Promise<InitialState | null> {
  const routes = getLocalRoutes(localRoutes);
    Object.keys(theme).forEach(key => {
      const url = theme[key]['--background-img'].split('(')[1].split(')')[0]
      console.log(url);
      const img = document.createElement('img')
      img.setAttribute('key', url)
      img.setAttribute('src', url)
      img.setAttribute('style', 'display: none')
      document.documentElement.appendChild(img)
    })
    return {
      name: 'Gutter',
      routes,
    }
}

export default getInitialState;
