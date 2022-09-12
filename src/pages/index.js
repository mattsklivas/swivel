// Import React
import React from 'react'

// Import Antd elements
import { Button, Space, DatePicker } from 'antd'

function Home() {
  const onChange = () => {}
  return (
    <div style={{ padding: 100 }}>
      <Space direction="vertical">
        <Button type="primary">Primary Button</Button>
        <Button type="ghost">Ghost Button</Button>
        <DatePicker onChange={onChange} />
      </Space>
    </div>
  )
}

// function Index() {
//     return (
//         <h1>Hello World</h1>
//     )
// }

export default Home