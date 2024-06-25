const getProxy = (target, matchPath, pathRewrite) => ({
  proxy: {
    [matchPath]: pathRewrite
      ? {
          target,
          changeOrigin: true,
          pathRewrite: {
            [matchPath]: pathRewrite,
          },
        }
      : {
          target,
          enable: true,
        },
  },
});

module.exports = {
  8090: getProxy('http://localhost:8090/', '/gather', '/gather'),
  服务: getProxy('https://gatherinfo.icu/', '/gather', '/gather'),
  不使用: null,
};
