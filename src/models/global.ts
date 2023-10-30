// 全局共享数据示例
import { useState } from 'react';

const useUser = () => {
  const defaultTheme = window.localStorage.getItem('theme')
  
  const [name, setName] = useState<string>(defaultTheme==='black'? 'dark' : 'light');
  return {
    name,
    setName,
  };
};

export default useUser;
