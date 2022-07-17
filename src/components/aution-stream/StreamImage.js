import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;


const StreamImage = () => (
  <Card
    style={{
      width: 500,
    }}
    cover={
      <img
      height={300}
        alt="example"
        src="https://media.ohay.tv/v1/content/2015/04/12316-02-ohay-tv-560.jpg"
      />
    }
  >
    <Meta
      title="Card title"
      description="This is the description"
    />
  </Card>
);

export default StreamImage;