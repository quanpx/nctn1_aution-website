import { Button } from "antd";
import "./StreamPage.css"
import Countdown from "react-countdown";
const Completionist = () => <span>You are good to go!</span>;

const BeforeStream = ({ auction }) => {

    const differentTime = (auction) => {
        var now = new Date();
        var time = new Date(auction.start_time);
        var diffMs = (time - now); // milliseconds between now & Christmas
        console.log(diffMs);
        return diffMs;
    }

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        console.log(days, hours);
        if (completed) {
            // Render a completed state
            return <div className="">
                <Button size="large" shape="round" type="primary">Join Now</Button>
            </div>;
        } else {
            // Render a countdown
            return <div className="flex gap-3 z-1">
            <div className="text-5xl flex border-4 border-indigo-600 p-2 flex-col justify-center items-center">
                <h1 className="text-white ">Days</h1>
                <h1 className="text-white ">{days}</h1>
            </div>
            <div className="text-5xl text-white self-center">:</div>
            <div className="text-5xl flex flex-col justify-center items-center  border-4 border-indigo-600 p-2">
                <h1 className="text-white ">Hours</h1>
                <h1 className="text-white ">{hours}</h1>
            </div>
            <div className="text-5xl text-white self-center">:</div>
            <div className="text-5xl flex flex-col justify-center items-center  border-4 border-indigo-600 p-2">
                <h1 className="text-white ">Mins</h1>
                <h1 className="text-white ">{minutes}</h1>
            </div>
            <div className="text-5xl text-white self-center">:</div>
            <div className="text-5xl flex flex-col justify-center items-center  border-4 border-indigo-600 p-2">
                <h1 className="text-white ">Secs</h1>
                <h1 className="text-white ">{seconds}</h1>
            </div>
            </div>;
        }
    };

    return <div>
        <div className="auction-image"></div>
        <div className="flex flex-col justify-center items-center info-position">
            <h1 className="text-white text-5xl">Auction will be started after</h1>
            <Countdown
                date={Date.now() + differentTime(auction)}
                renderer={renderer}
            />
        </div>
        <div>

        </div>
    </div>
}
export default BeforeStream;