import { useRequest } from '@umijs/max'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button, Cascader, DatePicker, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import service from './service'
import { last } from 'lodash'
import dayjs, { Dayjs } from 'dayjs'
import { formatMessage, regExpKeys } from './config'
import { showData } from './data'

const filterName = (name: string) =>
  name.replace(new RegExp(regExpKeys.join('|'), 'g'), '')

const Vacation = () => {
  const [city1, setCity1] = useState<City[]>([])
  const [city2, setCity2] = useState<City[]>([])
  const [date, setDate] = useState<Dayjs>(dayjs())
  
  console.log(
    city1,
    city2,
  );
  
  const getWordRes = useRequest(service.getCity, { 
    manual: false,
    formatResult: (res) => {
      const a = res?.data?.districts?.[0]?.districts ?? []
      return {
        ...res,
        data: a?.map((item) => {
          return {
            ...item,
            label: filterName(item.name),
            value: filterName(item.name),
            children: item.districts?.map((c) => {
              return {
                ...c,
                label: filterName(c.name),
                value: filterName(c.name),
                // children: c.districts?.map((d) => {
                //   return {
                //     ...d,
                //     label: filterName(d.name),
                //     value: filterName(d.name),
                //   }
                // })
              }
            })
          }
        })
      }
    }
   })
  
  const getLangchainRs = useRequest(service.getLangchain, { 
    manual: true,
   
   })
  

   console.log(formatMessage(showData?.messages ?? []));
   
  return (
    <div>
      <Space>
        日期：
        <DatePicker value={date} onChange={(value) => setDate(value)} />
        出发地：
        <Cascader style={{ width: 300 }} value={(city1)} onChange={(value) => setCity1(value)} options={getWordRes?.data?.data} />
        目的地：
        <Cascader style={{ width: 300 }} value={(city2)} onChange={(value) => setCity2(value)} options={getWordRes?.data?.data} />
          <Button onClick={() => {
            console.log(city1, city2);
            getLangchainRs.run({
              sheng: [city1[0],city2[0]],
              place: [last(city1),last(city2)],
              y: date.format('YYYY'),
              m: date.format('M'),
              d: date.format('DD')
            })
          }} loading={getLangchainRs.loading}>查询</Button>
      </Space>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {last(formatMessage(getLangchainRs?.data?.data?.messages ?? []))?.content ?? ''}
      </ReactMarkdown>
    </div>
  )
}

export default Vacation