import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import { REGISTERED_AUCTION } from "../../config/server";
import moment from "moment";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const YourAuctions = () => {
    const { token } = useAuth()
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
            "Acept": "application/json"
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        try {
            const { data } = await axios.get(REGISTERED_AUCTION, config)
            console.log(data);
            setData(data.registered_auctions)
            setIsLoading(false)
        } catch (err) {
            console.log(err);
        }
    }

    if (isLoading) {
        return <h1> Loading </h1>
    }

    if (data.length === 0) {
        return <h1>Bạn chưa quan tâm phiên đấu giá nào.</h1>
    }
    const differentTime = (auction) => {
        var now = new Date();
        var time = new Date(auction.start_time);
        var diffMs = (time - now); // milliseconds between now & Christmas
        
        var diffDays = diffMs >= 0 ? Math.floor(diffMs / 86400000) : 0; // days
        var diffHrs =  diffMs >= 0 ? Math.floor((diffMs % 86400000) / 3600000):0; // hours
        var diffMins =  diffMs >= 0 ? Math.round(((diffMs % 86400000) % 3600000) / 60000): 0; // minutes

        return diffDays + " ngày, " + diffHrs + " giờ, " + diffMins + " phút";

    }
    const resolveStatusMessage = (status) => {
        switch(status){
            case "pending": return "Đợi phê duyệt"
            case "approved": return "Đã được phê duyệt"
            case "rejected": return "Đã bị từ chối"
            default: break;
        }
    }
    return <div>
        {data.map(({ auction, created_at,status }, idx) => {   
            return <div key={idx} className="flex gap-x-10 mt-10 pb-2 border-b-4 border-black-500">
                <img src={auction.image_url} width={200} className="basis-1/4"/>
                <div className="pt-10 basis-1/2">
                    <h1>Phiên đấu giá số #{auction.id}</h1>
                    <h1>Tên: {auction.name}</h1>    
                    <h1>Đăng ký lúc: {moment(created_at).format('LLLL')}</h1>
                    <h1>Thời gian còn lại: {differentTime(auction)}</h1>
                </div>
                <div className="p-5 pt-10 basis-1/4">
                    <Button type="primary" onClick={()=> navigate('/auction/'+auction.id)}>Xem chi tiết</Button> <br/>
                    <span className="ml-1 p-1">{resolveStatusMessage(status)}</span>
                </div>
            </div>
        })}
    </div>
}
export default YourAuctions;