declare module 'postcss-pxtorem';
declare module 'react-syntax-highlighter/dist/esm/styles/prism';
declare module 'react-syntax-highlighter';

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
