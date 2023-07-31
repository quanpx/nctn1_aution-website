import { Button, Divider, Form, Input, Pagination, Radio, Select, Skeleton, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUCTION_URL, LOT_URL } from '../../config/server';
import { getImage } from '../../firebase/firebase';
import { useAuth } from '../../hooks/useAuth';
import moment from 'moment';
import { useRef } from 'react';
const columns = [
  {
    title: 'Tên',
    key: 'name',
    dataIndex: 'name',
    width: "30%",
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Giá khời điểm',
    key: ' init_price',
    dataIndex: 'init_price',
    width: "10%",
    render: (price, _, idex) => price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
  },

  {
    title: 'Người mua',
    key: 'sold_for',
    width: "10%",
    dataIndex: 'sold_for',
  },
  {
    title: 'Giá bán',
    key: 'sold_price',
    width: "10%",
    dataIndex: 'sold_price',
  },
  {
    title: 'Phiên',
    key: 'session',
    width: "10%",
    dataIndex: 'session',

  },
  {
    title: 'Ảnh',
    key: 'image_url',
    dataIndex: 'image_url',
    render: (url, _, idex) => {
      return <img key={idex} src={url} width={100} height={100} />
    }
  },
];

const defaultParams = {
  name: "",
  isSold: "",
  session: "",
  orderBy: "",
  page: 1,
  size: 10
}
const AllLotInfo = () => {
  const navigate = useNavigate();
  const [isSelect, setIsSelect] = useState(false);
  const [row, setRow] = useState([]);
  const [data, setData] = useState(null);
  const [auctions, setAuctions] = useState()
  const [loading, setLoading] = useState(true)
  const [count,setCount] = useState(0)
  const [form] = Form.useForm()
  const text = Form.useWatch('text', form)
  const status = Form.useWatch('is_sold', form)
  const sort = Form.useWatch("sort", form)
  const session = Form.useWatch("session", form)

  const params = useRef(defaultParams)
 


  useEffect(() => {
    fetchData(data)
  }, [])

  // useEffect(()=>{
  //   fetchLots()
  // },[params])


  const fetchAuctions = async (config) => {
    try {
      const { data } = await axios.get(AUCTION_URL, config)
      console.log(data);
      const { auctions } = data
      console.log(auctions);
      setAuctions(auctions)
   
    } catch (error) {
      console.log(error);
    }
  }

  const fetchLots = async (params) => {
    console.log(params);
    try {
      const { data } = await axios.get(LOT_URL, params)
      const { lots,count } = data;
      let keyData = lots.map((item, idx) => ({ ...item, key: idx }))
      setCount(count)
      console.log(data);
      setData(keyData)

    } catch (e) {
      console.log(e);
    }
  }

  const fetchData = async () => {
    await fetchLots({params:params.current});
    await fetchAuctions()
    setLoading(false)

    
  }
  if (loading) {
    return <div>
      <Skeleton active />
      <Skeleton active />

      <Skeleton active />

    </div>
  }
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRows.length != 0) {
        setIsSelect(true);
      } else {
        setIsSelect(false)
      }

      setRow(selectedRows);
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.session !== undefined,
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  const handleCreateAuction = (e, row) => {
    e.preventDefault();
    navigate("/admin/createAuction", { state: row })

  }


  // const resolveParams = () => {

  //   const params = {
  //     name: text,
  //     isSold: status,
  //     session: session,
  //     orderBy: sort,
  //     page: 1,
  //     size: 10
  //   }
  //   return params;
  // }
  const handleTextChange = async () => {
   
    params.current.name = text
    await fetchLots({ params: params.current })

  }
  const handleStatusChange = async (value) => {
   
    console.log(value);
    params.current.isSold = value
    
    await fetchLots({ params: params.current })

  }

  const handleSortChange = async (value) => {

    params.current.orderBy = value

    await fetchLots({ params: params.current })
  }

  const handleAuctionChange = async (value) => {
    params.current.session = value
    await fetchLots({ params: params.current })

  }
  const handlePageChange = async (page,pageSize) => {
  
    params.current.page = page
    params.current.size = pageSize
    await fetchLots({ params: params.current })
   
  }
  return (

    <div>
      <div className='pl-4'> <Form

        form={form}
        labelCol={{
          span: 7,
        }}
        wrapperCol={{
          span: 20,
        }}
        layout="inline"
      >
        <Form.Item
          labelAlign='l'
          name="text"


        >
          <Input onKeyUp={handleTextChange} placeholder="Tìm kiếm sản phẩm" />
        </Form.Item>
       
          <Form.Item
            labelAlign='l'
            name="is_sold"
            wrapperCol={15}
          >
            <div>
              <Select defaultValue={""} onChange={handleStatusChange}>
                <Select.Option value="" selected>Trạng thái: Tất cả</Select.Option>
                <Select.Option value={false}>Chưa bán</Select.Option>
                <Select.Option value={true}>Đã bán</Select.Option>
              </Select>
            </div>
          </Form.Item>

          <Form.Item
            labelAlign='l'
            name="session"
            wrapperCol={20}
          >

            <Select defaultValue={""} onChange={handleAuctionChange}>
              <Select.Option value="" selected>Phiên: Tất cả các phiên</Select.Option>
              {auctions.map((a, idx) => <Select.Option value={a.id} key={idx}>{a.name}</Select.Option>)}
            </Select>

          </Form.Item>

          <Form.Item
            labelAlign='l'
            name="sort"
            wrapperCol={10}
          >

            <Select defaultValue={""} onChange={handleSortChange}>
              <Select.Option value="" selected>Sắp xếp: Mặc định</Select.Option>
              <Select.Option value={"init_price:ascend"}>Giá từ thấp đến cao</Select.Option>
              <Select.Option value={"init_price:descend"}>Giá từ cao xuống thấp</Select.Option>
            </Select>

          </Form.Item>
      </Form>
      </div>
      <Divider />
      {data != null ? <div>
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
          pagination={false}
          
        />
        <div className='p-4'> 
        <Pagination  pageSize={10} onChange= {(page,pageSize) => handlePageChange(page,pageSize)}  total={count} />
        </div>
       
        {isSelect && <Input type={"button"} value="Create Auction" onClick={(e) => handleCreateAuction(e, row)} />}
      </div> : <h1>Wait</h1>
      }

    </div>
  );
};

export default AllLotInfo;