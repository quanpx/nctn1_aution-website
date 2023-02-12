import React from 'react';
import LotInfo from "./LotInfo";
import "./LotItems.css"
const LotItems = ({ lots }) => {

    return (
        <div className="flex flex-row flex-wrap justify-start gap-y-2.5">
            {lots.map((lot, idx) => <LotInfo key={idx} lot={lot} />)}
        </div>
    )
}
export default LotItems;