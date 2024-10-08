import { defineConfig } from '@umijs/max';
import pxToRem from 'postcss-pxtorem';
import proxyMap from './config/proxy.js';
import routes from './config/routes';
const path = require('path');

const { MODE, PROXY, MENU_SOURCE } = process.env;


const proxyList = proxyMap as any;
const proxy = proxyList[PROXY!]?.proxy || {};

export default defineConfig({
  esbuildMinifyIIFE: true,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    jsMinifier: 'terser',
  cssMinifier: 'cssnano',
  antd: {
    style: 'css',
  },
  // https: {},
  hash: true,
  access: {},
  define: {
    MODE
  },
  model: {},
  initialState: {},
  request: { dataField: '' },
  routes,
  proxy,
  history: {
    type: 'hash',
  },
  alias: { '@': '/src' },
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
