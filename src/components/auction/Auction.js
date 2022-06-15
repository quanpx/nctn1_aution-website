import { HeartOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;

const Auction = ({ aution }) => {
  const navigate=useNavigate();
  const handleClick = ()=>{
      navigate("/auction")
  }
  return(
    <Card 
     hoverable={true}
      style={{
        width: 300,
      }}
      onClick={handleClick}
      cover={
        <img height={90}
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
    >
      <Meta
        title={aution.type}
        description={`${aution.lot} lots - ${aution.follow} followers`}
      />

      <Button><HeartOutlined key="heart" /> Follow this auction</Button>
    </Card>
)};
export default Auction;