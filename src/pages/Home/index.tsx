import { useModel } from '@umijs/max';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  return (
    <div>
      {/* <SliderValidation /> */}
      首页
    </div>
  );
};

export default HomePage;
