const UserStreamFunction = () => {

    return <div>
        <Button type="" onClick={handleJoin} disabled={isJoined}>{isJoined ? 'Joined' : 'Join Stream'}</Button>
        <Button type="" onClick={handleOut} disabled={!isJoined}>Out</Button>
    </div>
}

export default UserStreamFunction;