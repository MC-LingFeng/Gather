import { useEffect } from 'react';

const useListenScroll: (className: string, addclass: string) => void = (
  className,
  addclass,
) => {
  const scrollFun: (this: Window, ev: Event) => any = () => {
    const listenScrollTop = document.scrollingElement?.scrollTop ?? 0;

    const classDom =
      document.documentElement.getElementsByClassName(className)[0];
    const domClass = classDom.className.split(' ').length;
    if (listenScrollTop >= 75) {
      if (domClass === 1) {
        classDom.className = `${className} ${addclass}`;
      }
    } else {
      if (domClass !== 1) {
        classDom.className = className;
      }
    }
  };
  useEffect(() => {
    window.removeEventListener('scroll', scrollFun);
    window.addEventListener('scroll', scrollFun);
  }, []);
};

export default useListenScroll;
