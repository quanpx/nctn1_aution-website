import { Divider, Layout, Table } from "antd";
import React, { useState } from "react";
import { ROOT_API } from "../../config/server";
import { useAuth } from "../../hooks/useAuth";
import axios from 'axios'
import { useEffect } from "react";
import Header from "../../components/Header";
const { Content, Footer } = Layout;
const columns = [
    {
        title: 'Name',
        key: 'name',
        dataIndex: 'lot_name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Description',
        key: 'description',
        dataIndex: 'lot_description',
    },
    {
        title: 'Bid price',
        key: 'bid_price',
        dataIndex: 'bid_price',
    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
    },
    {
        title: 'Image',
        key: 'image_url',
        dataIndex: 'image_url',
        render: (url, _, idex) => {
            return <img key={idex} src={url} width={100} height={100} />
        }
    },
];

const YourBids = () => {
    const [user, token, isAuth] = useAuth();
    const [data, setData] = useState(null);

    useEffect(() => {
        getAllBids();
    }, [])

    const getAllBids = async () => {

        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
            "Acept": "application/json"
        }
        await axios.get(ROOT_API + "bid", { headers })
            .then(res => res.data)
            .then(dataRes => {
                setData(dataRes.bids)
                console.log(dataRes);
            })
    }
    return (
        <div>
            {data != null ?
                <div>
                    <div>
                        <Divider />
                        <Table
                            rowSelection={{
                                type: "checkbox",
                            }}
                            columns={columns}
                            dataSource={data}
                        />


                    </div>
                </div> : <h1>Wait a moment</h1>}
        </div>


    )
}

export default YourBids;