import AuctionRow from "./AuctionRow";
import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import Auction from "./Auction";
import { AUCTION_URL, REGISTERED_AUCTION } from "../../config/server";
import { Button, DatePicker, Form, Input, InputNumber, Pagination, Select } from "antd";
import "./Auction.css"
import AuctionItem from "./AuctionItem";
import { useAuth } from "../../hooks/useAuth";
import DateTimePicker from "react-datetime-picker";


const hour = 100; // For check state of auction

const Auctions = ({ paging }) => {
  const [data, setData] = useState(null);
  const [auctions, setAuctions] = useState([])
  const [loading, setLoading] = useState(true)
  const { token,isAuth } = useAuth();
  const [registedAuctions, setRegistedAuctions] = useState([])
  const [form] = Form.useForm()
  const text =Form.useWatch('text',form)
  const status = Form.useWatch('status',form)
  const date = Form.useWatch('date',form)
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
      "Acept": "application/json"
    }

  }

  // useEffect (()=> {
  //   fetchAuctions()
  // },[registedAuctions])

  useEffect(() => {
    fetchAuctions();
  }, [loading])

  useEffect(()=>{

    
    fetchRegisteredAuctions()
  },[])


  const fetchAuctions = async (config) => {
    try {
      const { data } = await axios.get(AUCTION_URL,config)
      let temp = data.auctions.map(auction => {
        let registed = checkRegistered(auction.id)
        return { ...auction, is_registed: registed }
      })
      setData(data)
      setAuctions(temp)
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  }
  const checkRegistered = (id) => {
    if (registedAuctions.length === 0) {
      return false;
    }

    for (var i = 0; i < registedAuctions.length; i++) {
      let item = registedAuctions[i];
      console.log(item,id);
      if (item.auction.id === id) {
        return true;
      }
    }
    return false;

  }
  const fetchRegisteredAuctions = async () => {
    console.log(isAuth);
    if(!isAuth)
    {
      return ;
    }
    try {

      const { data } = await axios.get(REGISTERED_AUCTION, config)
      setRegistedAuctions(data.registered_auctions)

    }
    catch (error) {
      console.log(error);
    }
  }
  const checkIsNew = (startTime) => {
    let start = new Date(startTime).getTime()

    let now = new Date().getTime()

    let diff = (start - now) / (1000 * 60 * 60)

    return diff < hour ? true : false
  }

  const resolveParams = () => {
    
    return {text,status,start_time:date}
  }
  
  const handleTextChange = async ()=>
  {
    const params = resolveParams()

    await fetchAuctions({params})
  }
  const handleValueChange = async (status)=>
  {
    console.log(status);
    const params = resolveParams()
    params.status = status
    console.log(params);
    await fetchAuctions({params})

  }
  const handleDateChange = async (date,dateString)=>
  {
    console.log(dateString);
    const start = new Date( dateString ? dateString : '2000-01-01').getTime()
    const params = resolveParams()
    params.start_time = start
    console.log(params);
    await fetchAuctions({params})

  }
  return (
    <>
      {!loading ? <div className="flex flex-row gap-2" >
        {data != null ?
          <>
            <div className="filter-side basis-1/3 pl-2 border-r-4">
              <h2 className="relative left-1/4 text-3xl py-3" >Filter Anything</h2>
              <Form
              
                form={form}
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 14,
                }}
                layout="horizontal"
              >
                <Form.Item 
                label="Text"
                name="text"
                
                >
                  <Input onKeyUp={handleTextChange} placeholder="Search for auction"/>
                </Form.Item>
                <Form.Item 
                label="Status"
                name="status"
                >
                  <Select defaultValue={""} onChange={handleValueChange}>
                  <Select.Option value="" selected>All</Select.Option>
                    <Select.Option value="active">Active</Select.Option>
                    <Select.Option value="start">Start</Select.Option>
                    <Select.Option value="end">End</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item 
                label="Date"
                name="date"

                >
                  <DatePicker onChange={handleDateChange}/>
                </Form.Item>
              </Form>
            </div>
            <div className=' basis-2/3 px-4'>
              <h1 className="text-base">{data.count} results</h1>
              <div className='flex flex-col justify-items-center gap-2'>
                {auctions.map((item, idx) => {
                  let handledItem = { ...item, is_new: checkIsNew(item.start_time) }
                  return <AuctionItem key={idx} auction={handledItem} />
                }
                )}
                {paging && <Pagination
                  style={{ marginTop: '15px' }}
                  defaultCurrent={1}
                  total={30}
                />}
              </div>
            </div>

          </>
          : <h1>Wait</h1>}

      </div> : <h1>Loading....</h1>}
    </>

  )
};
export default Auctions;