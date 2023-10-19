import { defineConfig } from '@umijs/max';
import pxToRem from 'postcss-pxtorem';
const path = require('path');
import routes from './config/routes';

export default defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  antd: {
    style: 'css',
  },
  hash: true,
  access: {},
  model: {},
  initialState: {},
  request: {},
  routes,
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
