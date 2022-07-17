import BidList from "./BidList";
import React from 'react';
import "./StreamPage.css"
const StreamVideo = ({ url }) => {
    return <div className="stream-video">
        <div className="video">
        <iframe width={500} height={300} src="https://youtube.com/embed/vS1j7VJ4DLc" />
        </div>
        <div className="register-button">
            <a href="#">Register to sale</a>
        </div>
        <BidList />
    </div>
}
export default StreamVideo;