const getLocalRoutes = (routes: UMIRoute): IRoute[] => {
  const notDisplayOnMenuRoutes = ['/403', '/404'];
  // routes 是一个数组，过滤掉数组元素中 layout 为 false 的、redirect 为 true 的
  // 也就是过滤掉不需要在菜单中显示的路由, 例如登录页
  return routes!
    .filter((route) => route.layout !== false)
    .filter((_) => !_.redirect)
    .filter((_) => !notDisplayOnMenuRoutes.includes(_.path)) as IRoute[];
};
export { getLocalRoutes };
