import { Button, Typography , Col, DatePicker, Form, Input, Modal, Row, Select, Space, Table, message } from 'antd'
import { ColumnType } from 'antd/es/table'
import React from 'react'
import { AdsType } from './type'
import { useRequest } from '@umijs/max'
import service from './service'
import { useExport } from '@/hooks'
import dayjs from 'dayjs'
import { adsValues } from './config'


const render =  (text) => {
  return  <Typography.Paragraph copyable>{text}</Typography.Paragraph>
}
const Ads = () => {
  const [searchForm] = Form.useForm()
  const [editForm] = Form.useForm()
  const [title, setTitle] = React.useState<string>('新增')
  const [open, setOpen] = React.useState<boolean>(false)
  const {exportExcel} = useExport()
  const queryRes = useRequest(service.getAdsList, {
    manual: false,
  })
  const createRes = useRequest(service.createAds, {
    manual: true,
    onSuccess: (res) => {
      if (res.code === 200){
        queryRes.refresh();
        setOpen(false)
      } else {
        message.error(res.msg)
      }
    }
  })
  const delRes = useRequest(service.deleteAds, {
    manual: true,
    onSuccess: (res) => {
      if (res.code === 200){
        queryRes.refresh();
      } else {
        message.error(res.msg)
      }
    }
  })
  const columns:ColumnType<AdsType>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      width: 50,
    },
    
    {
      title: 'GoogleEmail',
      dataIndex: 'email',
      width: 150,
      className: 'true',
      render,
    },
    
    {
      title: 'Google密码',
      dataIndex: 'psw',
      width: 150,
      className: 'true',
      render,
    },
    {
      title: 'AdsId',
      dataIndex: 'ads_code',
      width: 120,
      className: 'true',
      render,
    },
    {
      title: 'Google辅助邮箱地址',
      dataIndex: 'recovery_email',
      width: 150,
      render,
    },
    {
      title: '账号状态',
      dataIndex: 'status',
      width: 60,
      className: 'true',
      render: (text) => {
        switch (text) {
          case 0:
            return '正常'
          case 1:
            return '已撤销未回款'
          case 2:
            return '已撤销已回款'
          default:
            return '未知'
      }
    }
    },
    
    {
      title: 'Ads账号创建日期',
      dataIndex: 'create_time',
      width: 150,
      render: (text) => {
        if (!text) {
          return text 
        }else {
          return dayjs(text).format('YYYY-MM-DD HH:mm:ss')
        }
      }
    },
    {
      title: 'Ads账号修改日期',
      dataIndex: 'update_time',
      width: 150,
      render: (text) => {
        if (!text) {
          return text 
        }else {
          return dayjs(text).format('YYYY-MM-DD HH:mm:ss')
        }
      }
    },
    {
      title: 'Ads账号注销日期',
      dataIndex: 'logout_time',
      width: 150,
      render: (text) => {
        if (!text) {
          return text 
        }else {
          return dayjs(text).format('YYYY-MM-DD HH:mm:ss')
        }
      }
    },
    {
      title: 'Ads绑定支付宝',
      dataIndex: 'alipay_id',
      width: 150,
      render,
    },
    {
      title: 'Google手机号',
      dataIndex: 'phone',
      width: 150,
      render,
    },
    
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      width: 150,
      render: (text, record) => (
        <Space>
          <Button size='small' type='primary' onClick={() => {
            setTitle('编辑')
            editForm.setFieldsValue(record)
            setOpen(true)
          }}>编辑</Button>
          <Button size='small' type='primary' danger onClick={() => {
            delRes.run(record)
          }}>删除</Button>
        </Space>
      ),
    }
  ]

  const onExport = () => {
    if (!queryRes.data) {
      message.error('无法导出');
    }
    const sheetData = [
      columns.filter((item) =>  item.title !== '操作').map((item) => item.dataIndex as string),
      ...(queryRes.data?.data.map((item) => {
        return columns.filter((column) => column.title !== '操作').map((column) => item[column.dataIndex as string])
      
      }) ?? [])
    ]
    
      exportExcel({
        excel: [{
          sheetName: 'sheet1',
          sheetData ,
          header: columns.filter((item) =>  item.title !== '操作').map((item) => item.title as string)
        }],
        fileName: 'test'
      })
  }

  
  return (
    <div>
      <Typography.Paragraph copyable={{ text: adsValues }}>规避政策</Typography.Paragraph>
          <Form form={searchForm} layout="inline" onFinish={() => {
          const values = searchForm.getFieldsValue()
          const keys = Object.keys(values)
          const newObj: AdsType | any  = {}
          keys.forEach((key) => {
            if (key.indexOf('time') !== -1 && values[key]){
              newObj[key] = values[key].format('YYYY-MM-DD')
            }
              newObj[key] = values[key]
          })
            queryRes.run(newObj)
          }}>
            <Row gutter={16}>
            {
              columns.filter(item => item.title !== '序号' && item.title !== '操作').map((item) => {
                if (item.title === '账号状态') {
                  return (
                    <Col span={12} key={item.title as string} style={{ marginBottom: 5}}>
                      <Form.Item name={item.dataIndex as string} label={item.title as string} 
                    >
                    <Select options={[
                      { label: '正常', value: 0 },
                      { label: '已撤销未回款', value: 1 },
                      { label: '已撤销已回款', value: 2 },
                    ]}/>
                  </Form.Item>
                  </Col>
                  )
                }
                if ((item.title as string).indexOf('日期') !== -1) {
                  return (
                    <Col span={12} key={item.title as string} style={{ marginBottom: 5}}>
                      <Form.Item name={item.dataIndex as string} label={item.title as string} 
                    >
                    <DatePicker />
                  </Form.Item>
                  </Col>
                  )
                }
                return (
                  <Col span={12} key={item.title as string} style={{ marginBottom: 5}}>
                      <Form.Item name={item.dataIndex as string} label={item.title as string} >
                    <Input placeholder={`请输入${item.title as string}`} />
                  </Form.Item>
                  </Col>
                )
              })
            }
            </Row>
           <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginTop: 5, marginBottom: 15}}>
            <div>
                <Space>
                  <Button type='primary' htmlType='submit'>查询</Button>
                  <Button type='primary' onClick={() => {
                      setTitle('新增')
                      editForm.setFieldsValue({})
                      setOpen(true)
                  }}>新增</Button>
                  <Button  htmlType='reset'>重置参数</Button>
                  <Button type='primary' onClick={onExport}>导出</Button>
                </Space>
            </div>
           </div>
          
            </Form>
      <Table<AdsType>
        columns={columns}
        dataSource={queryRes.data?.data ?? []}
        rowKey="email"
        size='small'
        loading={queryRes.loading}
        scroll={{ x: 1500 }}
      />
      <Modal
        title={title}
        open={open}
        onCancel={() =>{ 
          setOpen(false)
          editForm.resetFields()
        }}
        onOk={() => {
          editForm.submit()
        }}
        width={1200}
      >
        <Form form={editForm} onFinish={() => {
          createRes.run(editForm.getFieldsValue())
        }}>
        <Row gutter={16}>
            {
              columns.filter(item => item.title !== '序号' && item.title !== '操作' && (item.title as string).indexOf('日期') === -1 ).map((item) => {
                if (item.title === '账号状态') {
                  return (
                    <Col span={12} key={item.title as string} style={{ marginBottom: 5}}>
                      <Form.Item name={item.dataIndex as string} label={item.title as string} 
                      rules={item.className === 'true'? [{ required: true, message: `请输入${item.title as string}` }]: undefined}
                    >
                    <Select options={[
                      { label: '正常', value: 0 },
                      { label: '已撤销未回款', value: 1 },
                      { label: '已撤销已回款', value: 2 },
                    ]}/>
                  </Form.Item>
                  </Col>
                  )
                }
                return (
                  <Col span={12} key={item.title as string} style={{ marginBottom: 5}}>
                      <Form.Item name={item.dataIndex as string} label={item.title as string} 
                      rules={item.className === 'true'? [{ required: true, message: `请输入${item.title as string}` }]: undefined}
                    >
                    <Input placeholder={`请输入${item.title as string}`} />
                  </Form.Item>
                  </Col>
                )
              })
            }
            </Row>
        </Form>
      </Modal>
    </div>
  )
}

export default Ads