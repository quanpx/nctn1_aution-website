import React from 'react';
import LotInfo from "./LotInfo";

const LotItems = ({ lots }) => {

    return (
        <div className="lot-items">
            {lots.map((lot,idx) => <LotInfo key={idx} lot={lot} />)}
        </div>
    )
}
export default LotItems;