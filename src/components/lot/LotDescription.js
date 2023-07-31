import React from "react";
const LotDescription = ({ lot }) => {
    console.log(lot);
    return (
        <div className="basis-2/3 flex flex-col">
            <div className="p-2 border-2 border-solid self-center">
                <img src={lot.image_url} width={500} height={500} />
            </div>
            <div className="lot-detail">
                <h2>Chi tiết sản phẩm</h2>
                <hr />
                <p><h5>Tên sản phẩm:</h5>{lot.name} </p> 
                <p><h5>Thông tin:</h5> {lot.description}</p>
            </div>
        </div>
    )
}
export default LotDescription;