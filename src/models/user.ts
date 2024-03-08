// 全局共享数据示例
import { useState } from 'react';

const useUser = () => {
  const defaultUserName = window.localStorage.getItem('username');

  const [name, setName] = useState<string | null>(defaultUserName);
  return {
    name,
    setName,
  };
};

export default useUser;
