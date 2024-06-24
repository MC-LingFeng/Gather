import { useExport } from '@/hooks'
import { Button, Input, message } from 'antd'
import React, { useState } from 'react'

const ExportXLSX = () => {
  const [value, setValue] = useState('')
  const {exportExcel} = useExport()
  return (
    <div>
      <Input.TextArea value={value} onChange={(e) => setValue(e.target.value)}/>
      <Button onClick={() => {
      if (!value) {
        message.error('请输入内容');
      }
        const jsonToObj = JSON.parse(value);
        const title = Object.keys(jsonToObj[0]);
        const data = jsonToObj.map((item) => {
          return title.map((key) => item[key]);
        });
        exportExcel({
          excel: [{
            sheetName: 'sheet1',
            sheetData: data,
            header: title
          }],
          fileName: 'test'
        })
        console.log(jsonToObj);
        
      }}>下载</Button>
    </div>
  )
}

export default ExportXLSX