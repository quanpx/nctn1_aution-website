const BidList = () => {
    const bidList = ["In room 100$", "In room 200$", "In room 300$"]
    return (
        <div className="bid-list" style={{float:'right'}}>
            <h4>Bids for lot</h4>
            {bidList.map((bid, idx) => (<h3 key={idx}>{bid}</h3>))}
        </div>
    )
}
export default BidList;