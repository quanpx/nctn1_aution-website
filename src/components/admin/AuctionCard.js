import { Button, Collapse, Spin, notification } from "antd";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { APPROVE_REQUEST, REGISTER_REQUEST, UPDATE_AUCTION_STATUS } from "../../config/server";
import { useState } from "react";
import { PoweroffOutlined } from "@ant-design/icons";
const { Panel } = Collapse;
const AuctionCard = ({ auction }) => {
    const { token } = useAuth()
    const [isLive, setIsLive] = useState(auction.is_stream)
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(false)

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
        var diffHrs = diffMs >= 0 ? Math.floor((diffMs % 86400000) / 3600000) : 0; // hours
        var diffMins = diffMs >= 0 ? Math.round(((diffMs % 86400000) % 3600000) / 60000) : 0; // minutes

        return diffDays + " ngày, " + diffHrs + " giờ, " + diffMins + " phút";

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
    const handleFetchRequests = async () => {
        if (loading) {
            return;
        }
        const params = {
            id: auction.id,
            status: "pending"
        }
        setLoading(true)
        setTimeout(async () => {
            try {
                const { data } = await axios.get(REGISTER_REQUEST, { params }, configs);
                const { register_requests } = data;
                console.log(data);
                setRequests(register_requests)
                setLoading(false)

            } catch (e) {
                console.log(e);
            }
        }, 2000)

    }

    const handleApproveRequest = (id, approve) => {
        const params = {
            id,
            approve
        }
        setTimeout(async () => {
            try {
                const { data } = await axios.get(APPROVE_REQUEST, { params }, configs);
                console.log(data);

                await handleFetchRequests();
                
                notification.open({
                    description: "Phê duyệt thành công"
                })


            } catch (e) {
                console.log(e);
            }
        }, 2000)
    }
    return <div className=" flex flex-col ">
        <div className="flex p-10 border-t-4 border-black-900 gap-x-10">
            <img src={auction.image_url} width={250} />
            <div className="mt-10">
                <h1>Phiên đấu giá só :#{auction.id}</h1>
                <h1 className="text-xl"><Link to={'/auction/' + auction.id}>{auction.name}</Link></h1>
                <h1>Thời gian bắt đầu : {moment(auction.start_time).format('LLLL')}</h1>
                <h1>Thời gian còn lại : {differentTime()}</h1>
                <h1 onClick={handleFetchRequests}>{auction.register_num} lượt đăng ký, {auction.pending_request} đang xử lý</h1>
                <Button disabled={isLive} className="mr-2" type="primary" onClick={handleStart}>Bắt đầu</Button>
                <Button disabled={!isLive} className="mr-2" type="danger">Dừng</Button>
                <Button disabled={isLive} type="primary" ghost>Hủy</Button>
            </div>
            <div>
                {isLive ? <Link className="text-xl underline text-red-700" to={'../../auction-stream/' + auction.id}>Đến trang trực tiếp</Link> : ''}
            </div>
        </div>
        <Collapse onChange={handleFetchRequests} >
            <Panel isActive={true} header="Yêu cầu tham gia" key="1">
                {loading ? <Spin /> :

                    requests.length !== 0 ?
                        requests.map((r, idx) => {
                            console.log(r);
                            return <div className="flex flex-row gap-10 border p-3 justify-start" key={idx}>
                                <p className="pt-2" >{r.owner} yêu cầu tham gia lúc {moment(r.created_at).format("LLLL")}</p>

                                <div>
                                    <Button className="mr-3" onClick={() => handleApproveRequest(r.id, true)}>Phê duyệt</Button>
                                    <Button type="danger" onClick={() => handleApproveRequest(r.id,false)}>Từ chối</Button>
                                </div>
                            </div>
                        }) : <h1>Không có yêu cầu nào</h1>
                }
            </Panel>
        </Collapse>

    </div>
}

export default AuctionCard;