import moment from "moment";
import { Link } from "react-router-dom";
import { modifyCurrency } from "../../utils/priceUtils";

const FavoriteItem = ({lot}) => {
    return <>
        <img src={lot.image_url} width={200}/>
        <div className="w-full">
            <p><span><i>Thời gian diễn ra:</i></span> {moment(lot.start_time).format('MMMM Do YYYY, h:mm:ss a')}</p>
            <h1><Link to={'/lot/'+lot.id}> Sản phẩm {lot.id}: {lot.name}</Link></h1>
            <p>{lot.description}  </p>
            <h1>Giá khởi điểm: <span className="text-red-500">{modifyCurrency(lot.init_price)}</span> ({lot.bid_num} lượt bỏ giá) </h1>     
        </div>
    </>
  
  
    
}

export default FavoriteItem;