import AuctionRow from "./AuctionRow";

const autionsInitial = [
    {
        id: 1,
        type:"Furniture",
        address: "Hanoi",
        startTime: "19:00",
        lot: 20,
        follow:1000
    },
    {
        id: 2,
        type:"Painting",
        address: "HoChiMinh",
        startTime: "19:00",
        lot: 50,
        follow:1000
    },
    {
        id: 3,
        type:"Antique",
        address: "Hanoi",
        startTime: "19:00",
        lot: 20,
        follow:1000
    }
]

const Auctions = () => {
    return (
        <div>
            <AuctionRow key={1}  items ={autionsInitial} />
            <AuctionRow  key={2} items ={autionsInitial}/>
            <AuctionRow  key={3} items ={autionsInitial}/>
        </div>
    )
};
export default Auctions;