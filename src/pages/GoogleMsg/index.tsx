import React from 'react'
import googleJson from './google.json';
import peopleJson from './people.json';
import { Button } from 'antd';

const GoogleMsg = () => {
  const value = googleJson.web
  const people = peopleJson.web
  
  return (
    <div>
      
      <Button onClick={() => {
        let params = ''
        Object.keys(people).forEach((item) => {
          params += `${item}=${people[item]}&`
        })
        window.open(`${window.location.origin}/google.html`)
      }}>
        跳转
      </Button>
    </div>
  )
}

export default GoogleMsg