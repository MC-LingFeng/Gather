import type { ThemeConfig } from 'antd';
import { useMemo, useState } from 'react';


const useAntdTheme = (): [
  ThemeConfig,
  ({ primaryVar, colorVar }: {
    primaryVar?: string | undefined;
    colorVar?: string | undefined;
}) => void
] => {
  const [primary, setPrimary] = useState('#91caff')
  const [primaryLight, setPrimaryLigtht] = useState('#91caff')
  const [color, setColor] = useState('#000')

  const theme: ThemeConfig = useMemo(() => {
    return {
      token: {
        colorPrimary: primary,
        colorSuccess: primary,
        colorInfo: primary,
        wireframe: true,
        colorText: color,
      },
      components: {
        Layout: {
          colorBgHeader: '#fff',
          colorBgTrigger: primary,
          controlHeight: 24,
        },
        Tag: {
          colorText: '#aaa',
        },
        Segmented: {
          itemHoverColor: primary,
        },
        Table: {
          headerBg: primary,
          headerColor: color,
          rowHoverBg: primaryLight,
        },
        FloatButton: {
          colorText: primary,
        },
      },
    }
  }, [primary, color, primaryLight])

  const setTheme = ({ primaryVar, colorVar, primaryLightVar}: { primaryVar?: string, colorVar?: string, primaryLightVar?: string}) => {
    if (primaryVar) {
      setPrimary(primaryVar)
    }
    if (colorVar) {
      setColor(colorVar)
    }
    if (primaryLightVar){
      setPrimaryLigtht(primaryLightVar)
    }
  }
  return [theme, setTheme];
};

export default useAntdTheme;
