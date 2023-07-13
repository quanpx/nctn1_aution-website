const AdminStreamFunction = () => {

    return <div>
        <Button type="" onClick={handleStart} disabled={!startable || auction.status === 'active'}>Start Stream</Button>
        <Button type="" onClick={handleEnd} disabled={startable || auction.status === 'end'}>End Stream</Button>
    </div>
}

export default AdminStreamFunction;