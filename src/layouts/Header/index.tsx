import React from 'react'
import styles from './index.module.css';
import { useCssModule } from '@/hooks';


const Header = () => {
  const styleCtx = useCssModule(styles);

  return (
    <div className={styleCtx('header-container')}>Header</div>
  )
}

export default Header