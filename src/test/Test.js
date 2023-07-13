import { Stomp } from "@stomp/stompjs";
import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import SockJsClient from 'react-stomp';
var socket;
const url = 'http://localhost:8000/nctn-ws/';
const Test = () => {
    const clientRef = useRef()
    useEffect(() => {
        socket = new SockJS(url)
        var stompClient = Stomp.over(socket)

        stompClient.connect({username: 'quan'+ Math.floor(Math.random() * 10)}, (frame) => {
            console.log(frame);

            stompClient.subscribe('/topic/auction', (greeting) => {
                console.log(JSON.parse(greeting.body));
            })
            stompClient.subscribe("/users/queue/messages",(data)=> {
                console.log(JSON.parse(data.body));
            })
            stompClient.send("/nctn-ws/auction",{},JSON.stringify({name:"quan"}))
        
        })
    }, [])
    return <div>
        <h1>Test</h1>
    </div>
}

export default Test;