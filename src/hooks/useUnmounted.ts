import React, { useEffect, useRef } from 'react';
/**
 * 组件是否是卸载状态
 * @returns React.MutableRefObject<boolean>
 */
const useUnmounted: () => React.MutableRefObject<boolean> = () => {
  const unmounted = useRef<boolean>(false);

  useEffect(() => {
    unmounted.current = false;
    return () => {
      unmounted.current = true;
    };
  }, []);

  return unmounted;
};

export default useUnmounted;
