import logo from './logo.svg';
import './App.css';
import {Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import AuctionDetail from './pages/AuctionDetail';
import AuctionStream from './pages/AutionStream';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/auction" element={<AuctionDetail/>}/>
      <Route path="/auction-stream" element={<AuctionStream/>}/>
    </Routes>
  );
}

export default App;
