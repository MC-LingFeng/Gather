import { Tooltip, type MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function transformRoutesToMenu(root: IRoute[]) {
  const result: MenuItem[] = root.map<MenuItem>((rootItem) => {
    return {
      label: (
        <Tooltip placement="top" title={rootItem.name}>
          {rootItem.name}
        </Tooltip>
      ),
      path: rootItem.path,
      key: rootItem.path,
      children: rootItem?.routes
        ? transformRoutesToMenu(rootItem!.routes)
        : null,
    } as MenuItem;
  });
  return result;
}

export { transformRoutesToMenu };
