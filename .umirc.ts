/*
 * @Author: lv 1294432739@qq.com
 * @Date: 2023-10-18 21:17:02
 * @LastEditors: lv 1294432739@qq.com
 * @LastEditTime: 2023-10-18 21:33:37
 * @FilePath: \Gather\.umirc.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'Study',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
    {
      name: '换肤',
      path: '/skin',
      component: './Skin',
    },
  ],
  npmClient: 'pnpm',
});
