import React from 'react'
import styles from './index.module.css'
import { useCssModule } from '@/hooks'
import service from './service';
import { useRequest } from '@umijs/max';

const UserOperate = () => {
  const stylesCtx = useCssModule(styles);

  const logout = useRequest(service.loginout, {
    manual: true,
    onSuccess: (res) => {
      if (res.code === 200){
        window.location.reload();
      }
    }
  })
  const onClick = async () => {
    const username = window.sessionStorage.getItem('username') as string;
    await logout.run({ username })
  }
  return (
    <div className={stylesCtx('user-info')}>
      <div style={{ height: 50, width: '100%' }}>1</div>
      <div style={{ height: 310, width: '100%' }}>22222222222222222222222222222222222222222222222</div>
      <div className={stylesCtx('hands-true')} style={{ height: 40, display: 'flex', justifyContent: 'flex-end', width: '100%' }} onClick={onClick}>
        退出登录
      </div>
    </div>
  )
}

export default UserOperate