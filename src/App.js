import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import AuctionDetail from './pages/AuctionDetail';
import AuctionStream from './pages/AutionStream';
import Dashboard from './pages/admin/Dashboard';
import CreateItem from './pages/admin/CreateItem';
import CreateAuction from './pages/admin/CreateAuction';
import AllLotInfo from './pages/admin/AllLotInfo';
import Login from './pages/auth/login';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path="/auction/:id" element={<AuctionDetail/>}/>
      <Route path="/auction-stream" element={<AuctionStream/>}/>
      <Route path="admin" element={<Dashboard/>}>
        <Route path="createItem" element={<CreateItem/>}/>
        <Route path="createAuction" element={<CreateAuction/>}/>
        <Route path="alllots" element={<AllLotInfo/>}/>
      </Route>
    </Routes>
  );
}

export default App;
