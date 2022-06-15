import { Image } from 'antd';
import "./Auction.css"
const AuctionImage = () => (
    <div className='auction-images'>
        <div className='auction-image'>
            <img width={200}
                src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
        </div>
        <div className='aution-image'>
            <img
                width={200}
                src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
            />
        </div>
        <div className='aution-image'>
            <img
                width={200}
                src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
            />
        </div>

    </div>

);

export default AuctionImage;