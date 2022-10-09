// Import React and Antd elements
import React from 'react'
import { Row, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

function LoadingComponent({message}) {
    const outlined = <LoadingOutlined style={{ fontSize: 40 }} spin />

    return (
        <Row type="flex" justify="center" align="middle" style= {{minHeight: '90vh'}}>
            <Spin indicator={outlined}/>
            <div style={{fontSize: 'xx-large', padding: '0 0 5px 15px'}}>{message}</div>
        </Row>
    )
}

export default LoadingComponent