// Import React
import React from 'react'
import Link from 'next/link'
// Import Antd elements
import { Button, Space, DatePicker } from 'antd'

import Head from 'next/head'
import styles from '../styles/Home.module.css'

function Home() {
  const onChange = () => { }
  return (
    <>
      <Head>
        <title>Swivel | Home</title>
        <metadata name="keywords" content="swivel"/>
      </Head>

        <div>
          <h1 className={styles.title}>Welcome to the Dashboard</h1>
          <Link href="/swivel/">
              <Button type="primary" className={styles.btn}>Go to Swivel listing</Button>
          </Link>
          <br/>
          <Space direction="vertical">
            <Button type="primary">Primary Button</Button>
            <Button type="ghost">Ghost Button</Button>
            <DatePicker onChange={onChange} />
          </Space>
        </div>
    </>
  )
}

export default Home