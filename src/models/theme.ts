// 全局共享数据示例
import { useSafeState } from '@/hooks';

const useTheme = () => {
  const defaultTheme = window.localStorage.getItem('theme') || 'white';
  const [themeName, setThemeName] = useSafeState<string>(defaultTheme);
  return {
    themeName,
    setThemeName,
  };
};

export default useTheme;
