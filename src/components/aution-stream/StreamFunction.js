import { Button, Popconfirm } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AUCTION_URL, LOT_MARK_AS_SOLD, UPDATE_AUCTION_STATUS } from "../../config/server";
import { useAuth } from "../../hooks/useAuth";
import { setCurrLot, setDisableSoldButton } from "../../hooks/slices/auctionSlice";

const StreamFunction = ({ auctionInfo }) => {
    const { role, token } = useAuth();
    const { latestBid } = useSelector(state => state.bid)
    const { currLot, disableSold } = useSelector((state) => state.auction)
    const dispatch = useDispatch()
    const configs = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
            "Accept": "application/json"
        }
    }
    useEffect(() => {

        getCurrentLot()

    }, [auctionInfo])

    const getCurrentLot = () => {
        const currTmp = auctionInfo.lots.filter(lot => lot.order_in_lot === auctionInfo.current_lot)[0];
        dispatch(setCurrLot(currLot))

    }

    const handleNext = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(AUCTION_URL + `/next?id=${auctionInfo.auction.id}`, configs)

        } catch (error) {
            console.log(error);
        }

    }

    const handleEnd = async () => {
        const body = {
            id: auctionInfo.auction.id,
            status: "end"
        }   
        try {
            await axios.post(UPDATE_AUCTION_STATUS, body, configs)
         
        }
        catch (error) {
            console.log(error)
        }
    }

    const resolveStreamFunction = () => {
        if (role === "admin") {
            if (currLot != null) {
                return <>
                    <Button type="primary" onClick={handleNext}>Tiếp</Button>
                    <Button disabled={disableSold} type="sucessful" onClick={markAsSold}>{currLot.is_sold ? 'Đã bán' : 'Bán'}</Button>
                    <Popconfirm
                        okText="Đồng ý"
                        cancelText="Không"
                        title="Dừng phiên đấu giá"
                        description="Bạn có muốn dừng phiên đấu giá?"
                        onConfirm={handleEnd}
                        onOpenChange={() => console.log('open change')}
                    >
                        <Button type="danger">Dừng trực tiếp</Button>
                    </Popconfirm>
                </>
            }


        }
    }
    const markAsSold = async (e) => {
        e.preventDefault()
        console.log(latestBid);
        const body = {
            user: latestBid.owner,
            bid_price: latestBid.bid_price,
            lot_id: latestBid.lot_id,
            bid_id: latestBid.id
        }

        try {
            const { data } = await axios.post(LOT_MARK_AS_SOLD, body, configs)
            dispatch(setDisableSoldButton(true))
        } catch (e) {
            console.log(e);
        }

    }

    const renderWaitingPart = () => {
        return <div>
            <div className="border-b-4 p-3 pl-10 ">
                <img className="m-auto" width={500} src={auctionInfo.auction.image_url} />
            </div>
            
            <div className="">
                <h3 style={{ paddingLeft: '10px' }}>{auctionInfo.auction.name}</h3>
                <p style={{ paddingLeft: '15px', paddingRight: '25px' }}>
                    {auctionInfo.auction.description}
                </p>
                <h1 className="text-red-500">The auction ended!. Please comeback soon!</h1>
                
               
            </div>
        </div>
    }
    return (
        <div className="stream-function">
            {resolveStreamFunction()}

        </div>)
}

export default StreamFunction;