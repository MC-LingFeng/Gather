import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';
import SliderValidation from '@/components/SliderValidation'

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
