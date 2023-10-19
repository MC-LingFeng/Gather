/* eslint-disable @typescript-eslint/no-unused-vars */
import { history } from '@umijs/max';

import localRoutes from '../../config/routes';
import { getLocalRoutes } from './helper';


async function getInitialState(): Promise<InitialState | null> {
  const routes = getLocalRoutes(localRoutes);

    return {
      name: 'Gutter',
      routes,
    }
}

export default getInitialState;
