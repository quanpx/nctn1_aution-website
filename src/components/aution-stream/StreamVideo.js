import BidList from "./BidList";
import React, { useEffect, useRef, useState } from 'react';
import "./StreamPage.css"
import { Button } from "antd";
import axios from "axios";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { AUCTION_URL, UPDATE_AUCTION_STATUS } from "../../config/server";

const constraints = {
    audio: false,
    video: {
        width: 250,
        height: 220
    }
}

let iceServers = {
    iceServers: [
        { urls: "stun:stun.services.mozilla.com" },
        { urls: "stun:stun.l.google.com:19302" },
    ],
};

let serverURL = "http://localhost:5000"
const USER = "user"
const ADMIN = "admin"

const StreamVideo = ({auction, eventSource, socket }) => {
    const [isStart, setIsStart] = useState(true)
    const [isJoined, setIsJoined] = useState(false)
    const [peopleWatching, setPeopleWatching] = useState(0)
    const [started, setStarted] = useState(false)
    const [startable, setStartable] = useState(false)
    const [status,setStatus] = useState('')
    const { role } = useAuth();
    const videoRef = useRef()
    const rtcPeerConnection = useRef()
    const { id } = useParams();
    const { token } = useAuth();

    const configs = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
            "Acept": "application/json"
        }
    }

    useEffect(() => {

        socket.on('num-join', function (data) {
            setPeopleWatching(data.active)
        })

        socket.on('join', (data) => {
            setIsJoined(data.joined)
        })

        socket.on("end", (data) => {
            console.log("end");
            rtcPeerConnection.current.close()
            rtcPeerConnection.current.onicecandidate = null;
            rtcPeerConnection.current.onaddstream = null;

            videoRef.current.srcObject = null;
        })
        eventSource.addEventListener('auction-update', (event) => {
            const data = JSON.parse(event.data)
            console.log(data);
            setStatus(data.status)
            data.status === "start" ? setStarted(true) : setStarted(false)
        })

        // Create a peer connection on local end point
        let _pc = new RTCPeerConnection(iceServers)

        // When remote endpoint has availbale track, set it to video local object
        _pc.ontrack = (e) => {
            videoRef.current.srcObject = e.streams[0]
            videoRef.current.onloadedmetadata = (e) => {
                videoRef.current.play()
            }
        };

        if (role == USER) {

            _pc.addTransceiver("video", { direction: "recvonly" })

            _pc.createOffer()
                .then((offer) => {
                    _pc.setLocalDescription(offer)
                })
                .catch(error => console.log(error))

        }
        else {
            // Create offer on local
            _pc.onnegotiationneeded = () => {
                setStartable(true)
                _pc.createOffer()
                    .then((offer) => {
                        _pc.setLocalDescription(offer)
                    })
                    .catch(error => console.log(error))

            }
        }

        rtcPeerConnection.current = _pc
        setAuctionStatus()

        return () => {
            socket.emit('leave')
            setIsJoined(false)
        }

    }, [])

    const getMediaDevices = () => {
        navigator.mediaDevices.getUserMedia(constraints)
            .then(stream => {
                videoRef.current.srcObject = stream
                videoRef.current.onloadedmetadata = (e) => {
                    videoRef.current.play()
                }
                stream.getTracks().forEach(track => {
                    rtcPeerConnection.current.addTrack(track, stream)
                })
            })
            .catch(error => console.log("Can't access media device"))

    }

    const setAuctionStatus = () => {
        setStatus(auction.status)
        auction.status === "start"? setStarted(true): setStarted(false)
    }
    const handleStart = async (e) => {

        e.preventDefault()
        const body = {
            id,
            status: "start"
        }
        try {
            await axios.post(UPDATE_AUCTION_STATUS, body, configs)
        }
        catch (error) {
            console.log(error)
        }

        //setIsStart(true)
        const payload = {
            sdp: rtcPeerConnection.current.localDescription
        };
        const { data } = await axios.post(serverURL + '/start', payload);
        const desc = new RTCSessionDescription(data.sdp);
        rtcPeerConnection.current.setRemoteDescription(desc).catch(e => console.log(e));


    }

    const handleJoin = async (e) => {
        e.preventDefault()
        const payload = {
            sdp: rtcPeerConnection.current.localDescription
        };

        const { data } = await axios.post(serverURL + '/join', payload);
        const desc = new RTCSessionDescription(data.sdp);
        rtcPeerConnection.current.setRemoteDescription(desc)
            .catch(e => console.log(e));

        socket.emit('join')
        setIsJoined(true)
    }
    const handleEnd = async () => {

        const body = {
            id,
            status: "end"
        }
        try {
            await axios.post(UPDATE_AUCTION_STATUS, body, configs)
            navigator.mediaDevices.getUserMedia(constraints)
                .then(stream => {
                    
                    stream.getTracks().forEach(track => {
                        console.log(track);
                        track.stop()
                    })
                })
                .catch(error => console.log("Can't access media device"))
        }
        catch (error) {
            console.log(error)
        }

        socket.emit("end");
    }
    const resolveStreamFunction = () => {
        console.log(status);
        if (role === "admin") {
            return <>
                <Button type="" onClick={getMediaDevices} disabled={!startable || auction.status ==='end'}>Open Camera</Button>
                <Button type="" onClick={handleStart} disabled={!startable || auction.status ==='end'}>Start Stream</Button>
                <Button type="" onClick={handleEnd} disabled={!startable || auction.status ==='end'}>End Stream</Button>
            </>
        } else if (role === "user") {
            if (status === 'start') {
                return <>
                    <h3><i>The auction has started. You can join now!</i></h3>
                     <Button type="" onClick={handleJoin} disabled={isJoined}>{isJoined ? 'Joined' : 'join Stream'}</Button>
                </>
            }else if(status === 'end')
            {
                return <h3><i>The auction finished! Waiting for next auction!</i></h3>
            }
             else {
                return <h3><i>The auction is not started! Waiting for auction start</i></h3>
            }
        }
    }

    return (
        <div className="stream-video">
            {started && <span>Watching: {peopleWatching}</span>}
            <div className="video">
                <video ref={videoRef} width={250} height={220} />
            </div>
            <div className="stream-function">
                {resolveStreamFunction()}


            </div>
        </div>
    )
}
export default StreamVideo;