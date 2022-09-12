import './node_modules/antd/dist/antd.css';
import { Button, Space, DatePicker, Card } from 'antd';

function Home() {
  const onChange = () => {};
  return (
    <div style={{ padding: 100 }}>
      <Space direction="vertical">
        <Button type="primary">Primary Button</Button>
        <Button type="ghost">Ghost Button</Button>
        <DatePicker onChange={onChange} />
      </Space>
    </div>
  );
}

// function Index() {
//     return (
//         <h1>Hello World</h1>
//     )
// }

export default Home