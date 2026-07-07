import {
  BgColorsOutlined,
  CoffeeOutlined,
  CodeOutlined,
  FileExcelOutlined,
  GiftOutlined,
  GlobalOutlined,
  HomeOutlined,
  KeyOutlined,
  PictureOutlined,
  SoundOutlined,
  TableOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import type { ReactNode } from 'react';

export type ToolCategory = '效率工具' | '内容创作' | '生活助手' | '系统功能';

export interface ToolItem {
  path: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: ReactNode;
  featured: boolean;
  order: number;
}

export const toolItems: ToolItem[] = [
  { path: '/pinyin', name: '拼音工具', description: '快速生成、调整与导出拼音内容。', category: '内容创作', icon: <SoundOutlined />, featured: true, order: 1 },
  { path: '/ai-picture', name: 'AI 绘图', description: '用文字描述生成你的创意图片。', category: '内容创作', icon: <PictureOutlined />, featured: true, order: 2 },
  { path: '/eat-what', name: '今天吃什么', description: '告别选择困难，快速决定一餐。', category: '生活助手', icon: <CoffeeOutlined />, featured: true, order: 3 },
  { path: '/u-lucky', name: '幸运算子', description: '轻量、有趣的随机选择工具。', category: '生活助手', icon: <GiftOutlined />, featured: true, order: 4 },
  { path: '/vacation', name: '旅行计划', description: '整理目的地、日期与旅行安排。', category: '生活助手', icon: <GlobalOutlined />, featured: false, order: 5 },
  { path: '/export-xlsx-lkb', name: '表格导出', description: '快捷生成并导出 Excel 文件。', category: '效率工具', icon: <FileExcelOutlined />, featured: false, order: 6 },
  { path: '/ads', name: 'ADS 账号管理', description: '集中管理账号及相关信息。', category: '效率工具', icon: <ToolOutlined />, featured: false, order: 7 },
  { path: '/download', name: '脚本下载', description: '下载ads相关脚本', category: '效率工具', icon: <FileExcelOutlined />, featured: false, order: 11 },
].sort((a, b) => a.order - b.order);

export const routeIcons: Record<string, ReactNode> = {
  '/home': <HomeOutlined />,
  '/hooks': <CodeOutlined />,
  '/access': <KeyOutlined />,
  '/ads': <ToolOutlined />,
  '/google-msg': <GlobalOutlined />,
  '/table': <TableOutlined />,
  '/skin': <BgColorsOutlined />,
};
