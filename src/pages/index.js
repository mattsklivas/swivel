// Import React
import React from 'react'

// Import Antd elements
import { Button, Space, DatePicker } from 'antd'

// Import SASS styling
import * as S from '../styles/main.module.sass'

function Home() {
  const onChange = () => {}
  return (
    <div style={{ padding: 100 }}>
      <Space direction="vertical">
        <Button type="primary" style={{background: S.testColor}}>Primary Button</Button>
        <Button type="ghost">Ghost Button</Button>
        <DatePicker onChange={onChange} />
      </Space>
    </div>
  )
}

export default Home