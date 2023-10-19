import type { ThemeConfig } from 'antd';
import { useState } from 'react';

const defaultThemeColor = '#91caff';
// const defaultThemeColor = '#91caff';
const defaultThemeRGBAValue = '24,136,89';

const useAntdTheme = (): [
  ThemeConfig,
  React.Dispatch<React.SetStateAction<ThemeConfig>>,
] => {
  const [theme, setTheme] = useState<ThemeConfig>({
    token: {
      colorPrimary: defaultThemeColor,
      colorSuccess: defaultThemeColor,
      colorInfo: defaultThemeColor,
      wireframe: true,
    },
    components: {
      Layout: {
        colorBgHeader: '#fff',
        colorBgTrigger: defaultThemeColor,
        controlHeight: 24,
      },
      Tag: {
        colorText: '#aaa',
      },
      Segmented: {
        itemHoverColor: defaultThemeColor,
      },
      Table: {
        colorFillAlter: `RGBA(${defaultThemeRGBAValue},0.1)`,
      },
      FloatButton: {
        colorText: defaultThemeColor,
      },
    },
  });

  return [theme, setTheme];
};

export default useAntdTheme;
