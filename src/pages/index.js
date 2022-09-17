// Import React
import React from 'react'

// Import Antd elements
import { Button, Space, DatePicker } from 'antd'

function Home() {
  const onChange = () => { }
  return (
    <div style={{ padding: 100 }}>
      <Space direction="vertical">
        <Button type="primary">Primary Button</Button>
        <Button type="ghost">Ghost Button</Button>
        <Button type="primary">btntest</Button>
        <DatePicker onChange={onChange} />
      </Space>
    </div>
  )
}

export default Home