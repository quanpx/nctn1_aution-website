import React from 'react';
import LotInfo from "./LotInfo";
import "./LotItems.css"
const LotItems = ({ lots }) => {

    return (
        <div style={{ marginTop: '50px' }}>
            <h1> All lots</h1>
            <div className="lot-items">
                {lots.map((lot, idx) => <LotInfo key={idx} lot={lot} />)}
            </div>
        </div>

    )
}
export default LotItems;