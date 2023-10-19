import { type MenuProps,Tooltip } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];
import { createFromIconfontCN } from '@ant-design/icons';
import dayjs from 'dayjs';

function transformRoutesToMenu(root: IRoute[]) {
  const result: MenuItem[] = root.map<MenuItem>(
    (rootItem) =>{
     
    // const svg = require('./SVGs/${rootItem.icon}.svg')
    console.log(1);
    
    return {
        label: 
        <Tooltip placement="top" title={rootItem.name} >{rootItem.name}</Tooltip>,
        icon: <img src={`SVGs/${rootItem.icon}.svg?v=${dayjs().valueOf()}`} />,
        //  <div style={{ background: `url(${`SVGs/${rootItem.icon}.svg?v=${dayjs().valueOf()}`})`, width: 33 , height: 33}}/>,
        path: rootItem.path,
        key: rootItem.path,
        children: rootItem?.routes
        ? transformRoutesToMenu(rootItem!.routes)
        : null,
      } as MenuItem
    }
  );

  return result;
}

export { transformRoutesToMenu };
