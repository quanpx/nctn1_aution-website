import { useSelector } from "react-redux"
const { registerAuctions } = useSelector((state)=>state.auction)

const checkRegisteredAuction = (id)=>{

   

    return registerAuctions.includes(id);
}
export default checkRegisteredAuction;