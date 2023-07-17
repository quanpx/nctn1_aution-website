import axios from "axios";
import { BID_IN_AUCTION } from "../config/server";




export const reloadBids = async (id,configs) => {
  
    console.log(configs);
    try {
        const { data } = await axios.get(BID_IN_AUCTION + `?lotId=${id}`, configs)
        console.log(data)
        if (data.bids.length === 0) {
            return []
        }
        else {
           return data.bids;
        }

    }
    catch (error) {
        console.log(error)
    }
}