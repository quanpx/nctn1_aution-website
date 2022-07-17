import React from 'react';
import { Col, Row } from 'antd';
import Auction from './Auction';
import './Auction.css';
const AuctionRow = ({ items }) => {
    console.log(items)
    return (
        <div className='aution-row'>
            <Row>
            {items.map(item => <Col
                xs={{
                    span: 5,
                    offset: 1,
                }}
                lg={{
                    span: 6,
                    offset: 2,
                }}
            >
                <Auction key={item.id} aution={item} />
            </Col>)}
        </Row>
        </div>
        
    )
}
export default AuctionRow;