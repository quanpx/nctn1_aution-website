import { DatePicker, Form, Input, InputNumber, Layout, Select, Slider } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AuctionInfo from './AuctionInfo';
import LotItems from '../lot/LotItems';
import { useDispatch } from "react-redux";
import { setAuction } from '../../hooks/slices/auctionSlice';
import { AUCTION_URL, LOT_URL } from '../../config/server';
import { useFetchFavoritesQuery } from '../../hooks/apis/favoriteApi';
import { useAuth } from '../../hooks/useAuth';


const { Content, Footer, Sider, Header } = Layout;

const AuctionDetail = () => {
    const [data, setData] = useState()
    const [lots, setLots] = useState()
    const [auctions, setAuctions] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const { id } = useParams();
    const [form] = Form.useForm()
    const text = Form.useWatch('text', form)
    const status = Form.useWatch('is_sold', form)
    const sort = Form.useWatch("sort",form)
    const dispatch = useDispatch()

    useEffect(() => { fetchData() }, [])

    const fetchData = async () => {
        await axios.get(AUCTION_URL + "/" + id)
            .then(res => res.data)
            .then(data => {
                dispatch(setAuction({ auction: data.auction }))
                setData(data);
                setLots(data.lots)
            })
            .catch(e => console.log(e))

        const { data } = await axios.get(AUCTION_URL);
        console.log(data);
        setAuctions(data.auctions);
        setLoading(false)

    }

    const fetchLots = async (params) => {
        try {
            const { data } = await axios.get(LOT_URL, params)
            console.log(data);
            setLots(data.lots);

        } catch (e) {
            console.log(e);
        }
    }
    const resolveParams = () => {

        const params = {
            name: text,
            isSold: status,
            session: id,
            orderBy: sort
        }
        return params;
    }
    const handleTextChange = async () => {
        const params = resolveParams()
        await fetchLots({ params })

    }
    const handleStatusChange = async (status) => {
        console.log(status);
        const params = resolveParams()
        params.isSold = status
        console.log(params);
        await fetchLots({ params })

    }

    const handleSortChange = async (sort) => {

        console.log(sort);
        const params = resolveParams()
        params.orderBy = sort
       
        await fetchLots({ params })
    }

    if (loading && auctions.length == 0) {
        console.log(auctions);
        console.log("to here");
        return <h1>Loading...</h1>
    }
    const handleNavigate = (id) => {
        console.log(id);
        navigate("/auction/" + id)
    }

    return (
        <Content
            style={{
                marginTop: '30px',
                padding: '10px 50px',
                minHeight: 280,
            }}
        >

            <div className='flex flex-col gap-4'>
                <AuctionInfo />

                <div className='flex flex-row'>
                    <div className=" basis-1/4 pl-2 border-r-4">
                        <h2 className="relative text-3xl py-3" >Bộ lọc</h2>
                        <div className='pt-4 pb-4 border-b-4'>
                            <Form

                                form={form}
                                labelCol={{
                                    span: 7,
                                }}
                                wrapperCol={{
                                    span: 20,
                                }}
                                layout="vertical"
                            >
                                <Form.Item
                                    labelAlign='l'
                                    label="Tìm kiếm"
                                    name="text"
                                    

                                >
                                    <Input onKeyUp={handleTextChange} placeholder="Tìm kiếm sản phẩm" />
                                </Form.Item>
                                <div >
                                    <Form.Item
                                        labelAlign='l'
                                        label="Trạng thái"
                                        name="is_sold"
                                    >
                                        <div>
                                            <Select defaultValue={""} onChange={handleStatusChange}>
                                                <Select.Option value="" selected>Tất cả</Select.Option>
                                                <Select.Option value={false}>Chưa bán</Select.Option>
                                                <Select.Option value={true}>Đã bán</Select.Option>
                                            </Select>
                                        </div>
                                    </Form.Item>
                                </div>
                                <div >
                                    <Form.Item
                                        labelAlign='l'
                                        label="Sắp xếp"
                                        name="sort"
                                    >
                                        <div>
                                            <Select defaultValue={""} onChange={handleSortChange}>
                                                <Select.Option value="" selected>Mặc định</Select.Option>
                                                <Select.Option value={"init_price:ascend"}>Giá từ thấp đến cao</Select.Option>
                                                <Select.Option value={"init_price:descend"}>Giá từ cao xuống thấp</Select.Option>
                                            </Select>
                                        </div>
                                    </Form.Item>
                                </div>
                            </Form>
                        </div>
                        <div>
                            <h1 className='text-2xl py-4'>Phiên đấu giá liên quan</h1>
                            <ul className='list-none px-4'>
                                {auctions.map((auction, idx) => {
                                    if (auction.id === id) {
                                        return <li key={idx} className='hover:list-disc mt-4 text-2xl border-b-4 pb-3'><span>{auction.name}</span></li>;
                                    } else {
                                        return <li key={idx} className='hover:list-disc mt-4 text-xl border-b-4 pb-3'><a href={`/auction/${auction.id}`}>{auction.name}</a></li>
                                    }
                                })}
                            </ul>
                        </div>

                    </div>

                    <LotItems lots={lots} />
                </div>

            </div>
        </Content>
    )
}

export default AuctionDetail;