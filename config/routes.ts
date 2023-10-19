import { defineConfig } from '@umijs/max';
type IRoute = Parameters<typeof defineConfig>[0]['routes'];

const routes: Exclude<NonNullable<IRoute>, false> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '首页',
    path: '/home',
    component: '@/pages/Home',
  },
  {
    name: '权限演示',
    path: '/access',
    component: '@/pages/Access',
  },
  {
    name: ' CRUD 示例',
    path: '/table',
    component: '@/pages/Table',
  },
  {
    name: '换肤',
    path: '/skin',
    component: '@/pages/Skin',
  },
];

export default routes;
