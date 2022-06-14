import { useState } from "react"
import Aution from "./Aution";

const autionsInitial = [
    {
        id: 1,
        address: "Hanoi",
        startTime: "19:00",
        lot:20
    },
    {
        id: 2,
        address: "HoChiMinh",
        startTime: "19:00",
        lot:50
    }
]
const Autions = () => {
    const [autions,setAutions]= useState(autionsInitial);
    console.log(autions)    
    return(
        autions.map(aution=>
            <Aution aution = {aution} key={aution.id} />
        )
    )
}
export default Autions;