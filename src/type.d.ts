declare module 'postcss-pxtorem';
declare module  'react-syntax-highlighter/dist/esm/styles/prism';
declare module  'react-syntax-highlighter';

interface InitialState extends User.Info {
  name: string;
  routes: IRoute[];
  defaultAntdColor: Record<string, string>
}

type IRoute = {
  name: string | undefined;
  path: string | undefined;
  layout?: false | undefined;
  icon?: string | undefined;
  routes?: IRoute[];
};