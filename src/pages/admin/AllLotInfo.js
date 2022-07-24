import { Button, Divider, Input, Radio, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROOT_API } from '../../config/server';
import { getImage } from '../../firebase/firebase';
import { useAuth } from '../../hooks/useAuth';
const columns = [
  {
    title: 'Name',
    key:'name',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Description',
    key:'description',
    dataIndex: 'description',
  },
  {
    title: 'Init Price',
    key:'current _price',
    dataIndex: 'current_price',
  },
  {
    title: 'Estm Price',
    key:'estm_price',
    dataIndex: 'estm_price',
  },
  ,
  {
    title: 'Start Time',
    key:'start_time',
    dataIndex: 'start_time',
  },

  {
    title: 'Is Sold',
    key:'is_sold',
    dataIndex: 'is_sold',
  },
  {
    title: 'Sold Price',
    key:'sold_price',
    dataIndex: 'sold_price',
  },
  {
    title: 'Session ID',
    key:'session',
    dataIndex: 'session',
  
  },
  {
    title: 'Image',
    key:'image_url',
    dataIndex: 'image_url',
    render: (url,_,idex)=> {
     return <img key={idex} src={url} width={100} height={100}/>
    }
  },
];


const AllLotInfo = () => {
  const [user, token, isAuth] = useAuth();
  const navigate = useNavigate();
  const [isSelect, setIsSelect] = useState(false);
  const [row, setRow] = useState([]);
  const [data, setData] = useState(null);
 

  useEffect(() => {
    getAllLots();
  }, [])

  const getAllLots = async () => {
    await axios.get(ROOT_API + "lot")
      .then(res => res.data)
      .then(dataRes =>{ 
        let keyData = dataRes.lots.map((item,idx)=>({...item,key:idx}))
        setData(keyData)
      console.log(dataRes);})
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
      disabled: record.session!== undefined,
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  const handleCreateAuction = (e,row) => {
    e.preventDefault();
    navigate("/admin/createAuction", { state: row })

  }
  return (

    <div>

      <Divider />
      {data != null ? <div>
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
        />
        {isSelect && <Input type={"button"} value="Create Auction" onClick={(e)=>handleCreateAuction(e,row) } />}
      </div> : <h1>Wait</h1>
      }

    </div>
  );
};

export default AllLotInfo;