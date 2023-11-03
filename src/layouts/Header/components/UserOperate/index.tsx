import React from 'react'
import styles from './index.module.css'
import { useCssModule } from '@/hooks'

const UserOperate = () => {
  const stylesCtx = useCssModule(styles);

  return (
    <div className={stylesCtx('user-info')}>
      UserOperate
    </div>
  )
}

export default UserOperate