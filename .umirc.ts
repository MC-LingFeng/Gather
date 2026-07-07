import { defineConfig } from '@umijs/max';
import pxToRem from 'postcss-pxtorem';
import proxyMap from './config/proxy.js';
import routes from './config/routes';
import downloadItems from './config/download-items.json';
const path = require('path');
const fs = require('fs');

const { MODE, PROXY, MENU_SOURCE } = process.env;


const proxyList = proxyMap as any;
const proxy = proxyList[PROXY!]?.proxy || {};

const downloadManifest = Object.keys(downloadItems).reduce(
  (manifest, folder) => {
    const sourceDir = path.resolve(__dirname, 'public', folder);
    const files = fs.existsSync(sourceDir)
      ? fs.readdirSync(sourceDir).filter((name) =>
          fs.statSync(path.join(sourceDir, name)).isFile(),
        )
      : [];
    manifest[folder] = files.map((name) => ({
      name,
      assetName: name === '.dev' ? 'environment.dev.txt' : name,
    }));
    files.forEach((name) => {
      const assetName = name === '.dev' ? 'environment.dev.txt' : name;
      const target = path.resolve(
        __dirname,
        'public',
        'download-assets',
        folder,
        assetName,
      );
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.copyFileSync(path.join(sourceDir, name), target);
    });
    return manifest;
  },
  {} as Record<string, Array<{ name: string; assetName: string }>>,
);

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
    MODE,
    DOWNLOAD_MANIFEST: downloadManifest,
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

    // langchain v1 依赖 @langchain/langgraph，后者使用 node:async_hooks（Node.js 专有 API）
    // 在浏览器环境中需要提供 fallback，否则 createAgent 等导出会是 undefined
    config.resolve.fallback.merge({
      async_hooks: false,
    });
  },
  npmClient: 'pnpm',
});
