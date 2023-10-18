/*
 * @Author: lv 1294432739@qq.com
 * @Date: 2023-10-18 21:33:52
 * @LastEditors: lv 1294432739@qq.com
 * @LastEditTime: 2023-10-18 22:01:46
 * @FilePath: \Gather\src\pages\Skin\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Button } from 'antd';
import cssVars from 'css-vars-ponyfill';
import ReactIcon from './components/ReactIcon';
import './index.css';
const colorObj = {
  light: {
    '--primary': 'red',
  },
  dark: {
    '--primary': 'black',
  },
};
const Skin = () => {
  function changeTheme(themeObj) {
    // const vars = Object.keys(themeObj)
    //   .map((key) => `--${key}:${themeObj[key]}`)
    //   .join(';');
    // document.documentElement.setAttribute('style', vars);

    cssVars({
      variables: themeObj,
      rootElement: document.documentElement,
    });
  }
  return (
    <div className="title-color">
      <p>我是一个文字</p>
      <div style={{ textAlign: 'center' }}>
        <ReactIcon />
        <h1>Theme</h1>
      </div>
      <Button onClick={() => changeTheme(colorObj.light)}>light</Button>
      <Button onClick={() => changeTheme(colorObj.dark)}>black</Button>
    </div>
  );
};

export default Skin;
