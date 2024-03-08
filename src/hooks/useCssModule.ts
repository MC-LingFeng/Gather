import classNames from 'classnames/bind';

const useCssModule = (styles: Record<any, string>) => {
  const styleCtx = classNames.bind(styles);
  return styleCtx;
};

export default useCssModule;
