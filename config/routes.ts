import { defineConfig } from '@umijs/max';
type IRoute = Parameters<typeof defineConfig>[0]['routes'];

const routes: Exclude<NonNullable<IRoute>, false> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/u-lucky',
    name: '算子',
    layout: false,
    component: '@/pages/ULucky',
  },
  {
    path: '/eat-what',
    name: '吃啥',
    layout: false,
    component: '@/pages/EatWhat',
  },
  {
    path: '/pinyin',
    name: '拼音',
    layout: false,
    component: '@/pages/Pinyin',
  },
  {
    name: 'hooks',
    path: '/hooks',
    routes: [
      {
        name: '自定义hooks',
        path: '/hooks/customize',
        component: '@/pages/StudyHooks/Customize',
      },
    ],
  },
  {
    name: '首页',
    icon: 'Icon-1',
    path: '/home',
    component: '@/pages/Home',
  },
  {
    name: '权限演示',
    icon: 'Icon-2',
    path: '/access',
    component: '@/pages/Access',
  },
  {
    name: ' CRUD 示例',
    icon: 'Icon-3',
    path: '/table',
    component: '@/pages/Table',
  },
  {
    name: '换肤',
    icon: 'Icon-4',
    path: '/skin',
    component: '@/pages/Skin',
  },
];

export default routes;
