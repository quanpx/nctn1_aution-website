import { CalendarOutlined, UnorderedListOutlined } from "@ant-design/icons";
import moment from "moment";
import { Link } from "react-router-dom";
import "./AuctionCard.css"
const AuctionCard = ({auction}) =>
{
    
    let time= moment(auction.start_time).format('MMMM Do YYYY, h:mm a');
    let hours=parseInt(moment.duration(moment(auction.start_time).diff(moment(new Date()))).asHours());
   
    return (
    <div className="auction-card">
       
        <div className="auction-basic-info">
            <h1><Link to={"auction/"+auction.id}>{auction.name}</Link></h1>
            <h3>Scheduled closure date : {time}</h3>
            
        </div>
        <div className="auction-data">
            <div className="auction-data-base" id="num_item">
               <h1 style={{paddingTop:5}}>{auction.num_item}</h1>
              <h1> <UnorderedListOutlined /> Lots in auction</h1>
            </div>
            <div className="auction-data-base" id="time">
                <h1 style={{paddingTop:5}}>{hours}</h1>
                <h1><CalendarOutlined /> Hours to closure</h1>
            </div>
        </div>
    </div>
    )
}

export default AuctionCard;