import React from "react";
const LotDescription = ({lot}) =>
{
    console.log(lot);
    return (
        <div className="lot-description">
           <div className="lot-image" style={{textAlign:'center'}}>
                <img src={lot.image_url} width={400} height={400}/>
           </div>
           <div className="lot-detail">
            <h2>Item detail</h2>
            <hr/>
            <h3>Description</h3>
            <h5>{lot.name}</h5>
            <h5>{lot.description}</h5>
           </div>
        </div>
    )
}
export default LotDescription;