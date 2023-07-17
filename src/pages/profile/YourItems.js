import { CaretRightOutlined } from '@ant-design/icons';
import { Button, Collapse, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import "./profile.css"
import { useAuth } from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ITEMS } from '../../config/server';
const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const YourItems = () => {

    const { token } = useAuth()
    const navigate = useNavigate()
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
            "Acept": "application/json"
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        try {
            const { data } = await axios.get(ITEMS, config);
            console.log(data);
            setItems(data.items)
            setIsLoading(false)
        } catch (error) {
            console.log(error);
        }
    }
  

    if (isLoading || items.length === 0) {
        return <div>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
        </div>
    }
    return <div>
        <Collapse
            bordered={false}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            className="site-collapse-custom-collapse"
        >
            {
                items.map((item, idx) => {
                    const { auction, won_lots, is_paid, total} = item
                    return <Panel header={<div className='flex flex-col gap-y-4'>
                        <div className='basis-2/3'>
                            Phiên đấu giá: <h1> {auction.name}</h1>
                            <span>Số sản phẩm thắng: {won_lots.length} lots</span>
                        </div>
                        <div className='basis-1/3'>
                            {!is_paid ? <span className='text-red-500'>Chưa thanh toán</span> : <span className='text-green-500'>Đã thanh toán</span> }
                        </div>
                    </div>} key={idx} className="site-collapse-custom-panel">
                        <div className='flex flex-col gap-y-5'>
                            {won_lots.map((lot, idx) => <div className='flex flex-row border-t-4 pt-5' key={idx}>
                                <div className='basis-2/3'>
                                    <h2>Sản phẩm: <Link to={"/lot/" + lot.id}>{lot.name}</Link> <br /> <span>Gía mua: {lot.sold_price}</span></h2>
                                </div>
                                <div className='basis-1/3'>
                                    <img src={lot.image_url} width={100} />
                                </div>

                            </div>)}
                            <div>
                                <h1>Thông tin thanh toán: </h1>
                                <h1>Tổng tiền: {total} $</h1>
                            {!is_paid && <Button type='primary' onClick={()=>navigate("/payment?auction="+auction.id)}>Thanh toán</Button>}
                            </div>
                        </div>
                    </Panel>
                })
            }
        </Collapse>
    </div>

};
export default YourItems;

