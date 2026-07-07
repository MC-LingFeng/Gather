declare module 'postcss-pxtorem';
declare module 'react-syntax-highlighter/dist/esm/styles/prism';
declare module 'react-syntax-highlighter';

declare const MODE: 'dev' | 'test' | 'prod';
declare const DOWNLOAD_MANIFEST: Record<
  string,
  Array<{ name: string; assetName: string }>
>;
interface InitialState extends User.Info {
  name: string;
  routes: IRoute[];
  defaultAntdColor: Record<string, string>;
  defaultTheme: string;
}

type IRoute = {
  name: string | undefined;
  path: string | undefined;
  layout?: false | undefined;
  /** 是否在导航菜单中展示；不影响路由注册。 */
  show?: boolean;
  icon?: string | undefined;
  routes?: IRoute[];
};

type APIBody<T> = {
  data: T;
  code: number;
  message: string;
};

type User = {
  user_id: number;
  username: string;
  grade: number;
  phone?: string;
  mail?: string;
  gender?: string;
};
