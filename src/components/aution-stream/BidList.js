import { CheckOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Form, List, notification } from 'antd';
import React, { useEffect } from 'react';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PriceInput from '../../pages/lot/PriceInput';
import axios from 'axios'
import "./StreamPage.css";
import { useAuth } from '../../hooks/useAuth';
import { ROOT_API } from '../../config/server';
import { addBid } from '../../feature/bidSlice';

const BidList = ({ event,lot,bids }) => {
   
    const params=useParams();
    const {registerAuctions}= useSelector((state)=>state.auction)
    const [registered, setRegistered] = useState(false)

    return (
        <div className="bid-list" style={{ float: 'right' }}>
            {bids.length!=0?<List
                size="small"
                bordered
                dataSource={bids}
                renderItem={(item,idx) => <List.Item key={idx}>{item}</List.Item>}
            />:<div>No bids</div>}
         
        </div>
    )
}
export default BidList;