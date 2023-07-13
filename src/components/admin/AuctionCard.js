import { Button, notification } from "antd";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { UPDATE_AUCTION_STATUS } from "../../config/server";
import { useState } from "react";

const AuctionCard = ({ auction }) => {
    const {token} = useAuth()
    const [isLive, setIsLive] = useState(auction.is_stream)

    const configs = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
            "Acept": "application/json"
        }
    }

    const differentTime = () => {
        var now = new Date();
        var time = new Date(auction.start_time);
        var diffMs = (time - now); // milliseconds between now & Christmas
        
        var diffDays = diffMs >= 0 ? Math.floor(diffMs / 86400000) : 0; // days
        var diffHrs =  diffMs >= 0 ? Math.floor((diffMs % 86400000) / 3600000):0; // hours
        var diffMins =  diffMs >= 0 ? Math.round(((diffMs % 86400000) % 3600000) / 60000): 0; // minutes

        return diffDays + " days, " + diffHrs + " hours, " + diffMins + " minutes left";

    }
    const handleStart = async () => {
        const body = {
            id: auction.id,
            status: "start"
        }
        try {
            await axios.post(UPDATE_AUCTION_STATUS, body, configs)
            setIsLive(true)
            notification.open({
                message: 'Start live',
                description: 'You have just start auction' + auction.name 
            })
        }
        catch (error) {
            console.log(error)
        }

    }
    return <div className=" flex p-10 border-t-4 border-black-900 gap-x-10">
        <img src={auction.image_url} width={250} />
        <div className="mt-10">
            <h1>Auction number :#{auction.id}</h1>
            <h1 className="text-xl"><Link to={'/auction/' + auction.id}>{auction.name}</Link></h1>
            <h1>Start time : {moment(auction.start_time).format('LLLL')}</h1>
            <h1>Time to auction : {differentTime()}</h1>
            <h1>Register: {auction.register_num} people</h1>
            <Button disabled={isLive} className="mr-2" type="primary" onClick={handleStart}>Start</Button>
            <Button disabled={!isLive} className="mr-2" type="danger">End</Button>
            <Button disabled={isLive} type="primary" ghost>Cancel</Button>
        </div>
        <div>
            {isLive ? <Link className="text-xl underline text-red-700" to={'../../auction-stream/'+auction.id}>Go to live</Link>: ''}
        </div>


    </div>
}

export default AuctionCard;