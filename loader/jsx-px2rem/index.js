// import regRules from './reg';
const regRules = require('./reg');

module.exports = function (source) {
  if (this.cacheable) {
    this.cacheable();
  }
  let backUp = source;

  // 将所有的 'px' => 'rem'
  // style={{marginRight: '1px'}} => style={{marginRight: '0.01rem'}}
  if (regRules.pxReg.test(backUp)) {
    backUp = backUp.replace(regRules.pxReg, (px) => {
      let val = px.replace(regRules.numReg, (num) => {
        return num / 16;
      });
      val = val.replace(/px$/, 'rem');
      return val;
    });
  }

  // 将部分可以使用数值的属性进行转换
  // marginRight: 1 => marginRight: '0.01rem'
  Object.keys(regRules.styleReg).forEach((key) => {
    const reg = regRules.styleReg[key];
    if (reg.test(backUp)) {
      backUp = backUp.replace(reg, (val) => {
        return val.replace(regRules.numReg, (num) => {
          return `"${num / 16}rem"`;
        });
      });
    }
  });

  // 主要针对 img 标签
  // img标签 width: 1 => style={{width: '0.01rem'}}
  Object.keys(regRules.imgReg).forEach((key) => {
    const reg = regRules.imgReg[key];
    if (reg.test(backUp)) {
      backUp = backUp.replace(reg, (val) => {
        let style = '';
        val.replace(regRules.numReg, (num) => {
          style = `${num / 16}rem`;
        });
        return `style={{${styleName}:"${style}"}}`;
      });
    }
  });

  return backUp;
};
