import { useAccess, useRequest } from '@umijs/max';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import service from './service';

const column: ColumnsType<User> = [
  {
    title: 'id',
    dataIndex: 'user_id',
    align: 'center',
  },
  {
    title: '用户名',
    dataIndex: 'username',
    align: 'center',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    align: 'center',
  },
  {
    title: '权限',
    dataIndex: 'grade',
    align: 'center',
  },
  {
    title: '电话',
    dataIndex: 'phone',
    align: 'center',
  },
  {
    title: '邮件',
    dataIndex: 'mail',
    align: 'center',
  },
];

const AccessPage: React.FC = () => {
  const access = useAccess();
  const userData = useRequest(service.getUser, { manual: false });
  console.log(userData.data);

  return (
    <div>
      <Table<User>
        columns={column}
        dataSource={userData?.data?.data ?? []}
        size="small"
        bordered
        loading={userData.loading}
      />
    </div>
  );
};

export default AccessPage;
