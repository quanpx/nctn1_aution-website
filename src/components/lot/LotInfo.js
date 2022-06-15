import { HeartOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import "./LotItems.css";
const { Meta } = Card;
const LotInfo = ({ lot }) => {
    return (
        <div className="lot-info">
            <Card
                style={{
                    width: "100%",
                }}
                cover={
                    <img
                        height="100"
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                }
                actions={lot.sold?[
                    <h4>Sold</h4>,

                    <HeartOutlined key="ellipsis" />,
                ]:[

                    <HeartOutlined key="ellipsis" />,
                ]}
            >
                <Meta
                    title={lot.name}
                    description={`Est. ${lot.estm}`}
                />
                <h5>{lot.currentPrice}</h5>
            </Card>
        </div>
    )
}

export default LotInfo;