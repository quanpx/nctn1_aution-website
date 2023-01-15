import LotInfo from "../lot/LotInfo"
import "./StreamPage.css"
import React from 'react';

const LotList = ({lots, title, next}) => {

    let lotsTemp = lots.map(lot => {
            return {
                ...lot,
                is_next: lot.order_in_lot === next
            }
        }
    ).sort(compare)

    function compare( a, b ) {
        if ( a.is_next < b.is_next ){
            return 1;
        }
        if ( a.is_next > b.is_next ){
            return -1;
        }
        return 0;
    }
    return (
        <div style={{marginTop: '5%'}}>
            <h1>{title}</h1>
            <div className="lot-list">

                {lotsTemp.map((lot, idx) => (<LotInfo key={idx} lot={lot}/>))}
            </div>
        </div>


    )
}
export default LotList;
