// 全局共享数据示例
import { useState } from 'react';

const useUser = () => {
  const [name, setName] = useState<string>('light');
  return {
    name,
    setName,
  };
};

export default useUser;
