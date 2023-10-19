import { defineConfig } from '@umijs/max';
import pxToRem from 'postcss-pxtorem';
const path = require('path');

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
  extraPostCSSPlugins: [
    pxToRem({
      rootValue: 16,
      minPixelValue: 2,
      propList: ['*'],
    }),
  ],
  chainWebpack: (config) => {
    config.module
      .rule('diy-loader')
      .test(/\.(tsx|jsx)$/)
      .exclude.add([path.resolve('./src/.umi'), path.resolve('node_modules')])
      .end()
      .use('./loader/jsx-px2rem')
      .loader(path.join(__dirname, './loader/jsx-px2rem'));
  },
  npmClient: 'pnpm',
});
