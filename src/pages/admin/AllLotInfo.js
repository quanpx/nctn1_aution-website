import { Button, Divider, Input, Radio, Table } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Init Price',
    dataIndex: 'initPrice',
  },
  {
    title: 'Estm Price',
    dataIndex: 'estmPrice',
  },
  ,
  {
    title: 'Start Time',
    dataIndex: 'startTime',
  },
  
  {
    title: 'Is Sold',
    dataIndex: 'isSold',
  },
  {
    title: 'Sold Price',
    dataIndex: 'soldPrice',
  },
  {
    title: 'Session ID',
    dataIndex: 'sessionId',
  },
];
const data = [
  {
    key: '1',
    id:1,
    name: 'Lot 1',
    description:"Description 1",
    initPrice:300,
    estmPrice:3000,
    startTime:"2022-07-05T19:00",
    isSold:false,
    soldPrice:null,
    sessionId:2

  },
  {
    key: '2',
    id:2,
    name: 'Lot 2',
    description:"Description 2",
    initPrice:300,
    estmPrice:3000,
    startTime:"2022-07-05T19:00",
    isSold:false,
    soldPrice:null,
    sessionId:2
  },
  {
    key: '3',
    id:3,
    name: 'Lot 3',
    description:"Description 3",
    initPrice:300,
    estmPrice:3000,
    isSold:false,
    soldPrice:null,
    sessionId:null
  },
  {
    key: '4',
    id:4,
    name: 'Lot 4',
    description:"Description 4",
    initPrice:300,
    estmPrice:3000,
    isSold:false,
    soldPrice:null,
    sessionId:null
  },
]; // rowSelection object indicates the need for row selection



const AllLotInfo = () => {
  const navigate= useNavigate();
  const [selectionType, setSelectionType] = useState('checkbox');
  const [isSelect,setIsSelect]=useState(false);
  const [row,setRow]=useState([]);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      if(selectedRows.length!=0)
      {
        setIsSelect(true);
      }else
      {
        setIsSelect(false)
      }
     
      setRow(selectedRows);
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.sessionId !== null,
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  const handleCreateAuction= (e) =>
  {
    e.preventDefault();
    navigate("/admin/createAuction",{state:data})

  }
  return (
    <div>
     
      <Divider />

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
       {isSelect && <Input type={"button"} value="Create Auction" onClick={handleCreateAuction}/>}
    </div>
  );
};

export default AllLotInfo;