import BidList from "./BidList";
import "./StreamPage.css"
const StreamVideo = ({ url }) => {
    return <div className="stream-video">
        <div className="video">
        <iframe width={500} height={300} src="https://www.youtube.com/embed/rA8Lbjjl0R8" />
        </div>
        <div className="register-button">
            <a href="#">Register to sale</a>
        </div>
        <BidList />
    </div>
}
export default StreamVideo;