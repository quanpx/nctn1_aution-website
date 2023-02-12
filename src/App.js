import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import AuctionDetail from './components/auction/AuctionDetail';
import AuctionStream from './components/aution-stream/AutionStream';
import Dashboard from './pages/admin/Dashboard';
import CreateItem from './pages/admin/CreateItem';
import CreateAuction from './pages/admin/CreateAuction';
import AllLotInfo from './pages/admin/AllLotInfo';
import Login from './pages/auth/login';
import LotDetail from './components/lot/LotDetail';
import YourBids from './components/bid/YourBids';
import BasePage from './pages/layout/BasePage';
import SignUp from './pages/auth/signup';
import Auctions from './components/auction/Auctions';
function App() {
  return (
    <Routes>
      <Route path="/" element={<BasePage/>}>
        <Route path='' element={<Home/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='signup' element={<SignUp/>}/>
        <Route path="your-items" element={<YourBids/>}/>
        <Route path="auctions" element={<Auctions/>}/>
        <Route path="auction/:id" element={<AuctionDetail/>}/>
        <Route path="lot/:id" element={<LotDetail/>}/>
        <Route path="auction-stream/:id" element={<AuctionStream/>}/>
      </Route>
      
      <Route path="admin" element={<Dashboard/>}>
        <Route path="createItem" element={<CreateItem/>}/>
        <Route path="createAuction" element={<CreateAuction/>}/>
        <Route path="alllots" element={<AllLotInfo/>}/>
      </Route>
    </Routes>
  );
}

export default App;
