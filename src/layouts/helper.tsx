import { type MenuProps,Tooltip } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];
import { createFromIconfontCN } from '@ant-design/icons';
import dayjs from 'dayjs';
import { request } from '@umijs/max';


// dataurl 就是一个base64
function dataURLtoBlob(dataurl) {
  console.log(dataurl);
  
    let arr = dataurl.split(',')
    let mime = arr[0].match(/:(.*?);/)[1]
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
}




 function transformRoutesToMenu (root: IRoute[]) {
 
  const result: MenuItem[] = root.map<MenuItem>(
      (rootItem) =>{
        /**
         * TODO: 引入svg
         */
        const url = `${rootItem.icon}`
        const svg = require('@/assets/SVGs/' + url + '.svg')
        console.log(svg);
        
        let blob = dataURLtoBlob(svg.default)
        let path = ''
        const hello =  blob.text().then(res => {
          const a = res.split('<path d="')[1].split('" fill="')[0]
          path = a
          return a
        }) 
        console.log(path, hello);
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
