import { PageContainer } from '@ant-design/pro-components';
import { Access, useAccess, useRequest } from '@umijs/max';
import { Button } from 'antd';
import service from './service';

const AccessPage: React.FC = () => {
  const access = useAccess();
  const userData = useRequest(service.getUser, { manual: false })
  console.log(userData.data);
  
  return (
    <PageContainer
      ghost
      header={{
        title: '权限示例',
      }}
    >
      <Access accessible={access.canSeeAdmin}>
        <Button>只有 Admin 可以看到这个按钮</Button>
      </Access>
    </PageContainer>
  );
};

export default AccessPage;
