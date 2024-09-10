import { Col, Row } from 'antd'
import React from 'react'

const Footer = () => {
  return (
    <div style={{ 
    height: 40,
    marginTop: 10,
    borderRadius: 'var(--border-radius)',
    
      }}>
        <Row style={{ height: '100%'}}>
          <Col span={4}></Col>
          <Col span={16} style={{
            display: 'flex', 
            justifyContent: 'center',
            alignItems:'center',
            backgroundColor: 'var(--module-card-background)',
          }}>
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">京ICP备2024050962号-1</a>
          </Col>
          <Col span={4}></Col>
        </Row>
    </div>
  )
}

export default Footer