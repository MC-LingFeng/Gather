declare module 'postcss-pxtorem';

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