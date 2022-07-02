import LotInfo from "../lot/LotInfo"
import "./StreamPage.css"
const lotItems = [
    {
        id: 1,
        currentPrice: 100,
        lotNumber: 1,
        name: "Lot 1",
        estm: "1000$",
        soldPrice: null,
        sold:false
    },
    {
        id: 2,
        currentPrice: 100,
        lotNumber: 1,
        name: "Lot 1",
        estm: "1000$",
        soldPrice: null,
        sold:true
    },
    {
        id: 3,
        currentPrice: 100,
        lotNumber: 1,
        name: "Lot 1",
        estm: "1000$",
        soldPrice: null,
        sold:false
    },
    {
        id: 4,
        currentPrice: 100,
        lotNumber: 1,
        name: "Lot 1",
        estm: "1000$",
        soldPrice: null,
        sold:true
    },
    {
        id: 5,
        currentPrice: 100,
        lotNumber: 1,
        name: "Lot 1",
        estm: "1000$",
        soldPrice: null,
        sold:true
    },
    {
        id: 6,
        currentPrice: 100,
        lotNumber: 1,
        name: "Lot 1",
        estm: "1000$",
        soldPrice: null,
        sold:true
    },
    {
        id: 7,
        currentPrice: 100,
        lotNumber: 1,
        name: "Lot 1",
        estm: "1000$",
        soldPrice: null,
        sold:false
    },
    {
        id: 8,
        currentPrice: 100,
        lotNumber: 1,
        name: "Lot 1",
        estm: "1000$",
        soldPrice: null,
        sold:true
    },
    {
        id: 9,
        currentPrice: 100,
        lotNumber: 1,
        name: "Lot 1",
        estm: "1000$",
        soldPrice: null,
        sold:false
    }
]

const LotList =  () =>
{
    return (
        <div>
            <h2>Inprogress: 60%</h2>
            <div className="lot-list">
            
            {lotItems.map((lot,idx)=>(<LotInfo key={idx} lot={lot}/>))}
        </div>
        </div>
        
        
    )
}
export default LotList;
