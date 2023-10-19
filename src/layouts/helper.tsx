import { type MenuProps,Tooltip } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];
import { createFromIconfontCN } from '@ant-design/icons';
/**
 * Transform routes to menu items
 */
const IconFont = createFromIconfontCN({
  scriptUrl: '/iconfont.js',
});
function transformRoutesToMenu(root: IRoute[]) {
  const result: MenuItem[] = root.map<MenuItem>(
    (rootItem) =>
      ({
        label: 
        <Tooltip placement="top" title={rootItem.name} >{rootItem.name}</Tooltip>,
        icon:
          rootItem?.routes || rootItem.icon ? (
            <IconFont type={rootItem.icon ?? ''} />
          ) : null,
        path: rootItem.path,
        key: rootItem.path,
        children: rootItem?.routes
          ? transformRoutesToMenu(rootItem!.routes)
          : null,
      } as MenuItem),
  );

  return result;
}

export { transformRoutesToMenu };
