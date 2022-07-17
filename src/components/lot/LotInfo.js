import React, { useEffect, useState } from 'react';
import { HeartOutlined } from '@ant-design/icons';

import { Card } from 'antd';
import "./LotItems.css";
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
const { Meta } = Card;
const LotInfo = ({ lot }) => {
    const [imageUrl,setImageUrl]=useState();

    useEffect(()=>{
        const storage = getStorage();
        const starsRef = ref(storage, "images/"+lot.image_url);
        getDownloadURL(starsRef)
        .then((url) => {
          // `url` is the download URL for 'images/stars.jpg'
      
          // This can be downloaded directly:
          const xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = (event) => {
            const blob = xhr.response;
          };
          xhr.open('GET', url);
          xhr.send();
      
          // Or inserted into an <img> element
          setImageUrl(url);
        })
        .catch((error) => {
          // Handle any errors
        });
    },[])
    return (
        <div className="lot-info">
            {imageUrl!=null?<Card
                style={{
                    width: "100%",
                }}
                cover={
                    <img
                        height="100"
                        alt="example"
                        src={imageUrl}
                    />
                }
                actions={lot.is_sold?[
                    <h4>Sold</h4>,

                    <HeartOutlined key="ellipsis" />,
                ]:[

                    <HeartOutlined key="ellipsis" />,
                ]}
            >
                <Meta
                    title={lot.name}
                    description={`Est. ${lot.estm_price}`}
                />
                <h5>{lot.current_price}</h5>
            </Card>:<h1>Wait</h1>}
        </div>
    )
}

export default LotInfo;