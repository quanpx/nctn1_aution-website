const Aution = ({aution}) =>
{
    return (
        <div>
            <h3>{aution.address}</h3>
            <h3>{aution.startTime}</h3>
            <h3>{aution.lot}</h3>
        </div>
    )
}
export default Aution;