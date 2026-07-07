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
  { path: '/google-msg', name: 'Google 数据', description: '查看与处理 Google 数据内容。', category: '效率工具', icon: <GlobalOutlined />, featured: false, order: 8 },
  { path: '/table', name: 'CRUD 示例', description: '表格数据的新增、编辑与查询示例。', category: '系统功能', icon: <TableOutlined />, featured: false, order: 9 },
  { path: '/access', name: '权限演示', description: '查看不同权限下的页面与操作。', category: '系统功能', icon: <KeyOutlined />, featured: false, order: 10 },
  { path: '/skin', name: '主题实验', description: '体验项目主题和界面色彩。', category: '系统功能', icon: <BgColorsOutlined />, featured: false, order: 11 },
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
