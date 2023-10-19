import React from 'react'
import styles from './index.module.css';
import { useCssModule } from '@/hooks';
import { Col, Menu, Row } from 'antd';


const Header = () => {
  const styleCtx = useCssModule(styles);

  return (
    <div className={styleCtx('header-container')}>
      <Row gutter={12} style={{ height: '100%' }}>
        <Col span={6} className={styleCtx('header-left')}>Icon</Col>
        <Col span={12} className={styleCtx('header-center')}>
          <div>
            1
          </div>
          <div>
            1
          </div>
          <div>
            1
          </div>
          <div>
            1
          </div>
        </Col>
        <Col span={6} className={styleCtx('header-center')}>Other</Col>
      </Row>
    </div>
  )
}

export default Header