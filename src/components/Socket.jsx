import React, { useEffect } from 'react';
import {io} from 'socket.io-client';

function Lobby() {   

    useEffect(() => {
        handleSocket();
    }, []);

    console.log('connected to backend');
    const handleSocket = () => {
        const lobby = io('https://bullionstatus.com/');
        lobby.on('connect', function (socket){
            console.log('connected to backend');

            socket.on('disconnect', function(){
                console.log('disconnected: ', socket);
            });   

        });  
        lobby.on('gold-rate-change', function(msg){
            console.log('message: ', msg);
        });

    };   

    return (
        <div>

        </div>
    )

}

export default Lobby;