import React from 'react';
import Auctions from "../components/auction/Auctions";
import CustomFooter from "../components/CustomFooter";
import Description from "../components/Description";
import Header from "../components/Header";

const Home = () => {
    return (
        <div>
            <Description />
            <div style={{marginTop:'25px'}}>
            <h1 style={{fontSize:'25px',textDecoration:'underline'}}>Auctions</h1>
            <Auctions />
            </div>
            
        </div>
    )

}
export default Home;