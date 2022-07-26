import React from 'react';
import LotCard from './LotCard';

const LotItems = ({ lots }) => {

    return (
        <div className="lot-items">
            {lots.map((lot,idx) => <LotCard key={idx} lot={lot} />)}
        </div>
    )
}
export default LotItems;