import moment from "moment";
import { Link } from "react-router-dom";

const FavoriteItem = ({lot}) => {
    console.log(lot);
    return <>
        <img src={lot.image_url} width={200}/>
        <div className="w-full">
            <p><span><i>Timed Auctions:</i></span> {moment(lot.start_time).format('MMMM Do YYYY, h:mm:ss a')}</p>
            <h1><Link to={'/lot/'+lot.id}> Lot {lot.id}: {lot.name}</Link></h1>
            <p>{lot.description}   </p>
            <h1>Price: {lot.init_price} $ ({lot.bid_num} bid) </h1>     
        </div>
    </>
  
  
    
}

export default FavoriteItem;