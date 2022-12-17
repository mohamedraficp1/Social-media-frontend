import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import ChatOnline from '../chatOnline/ChatOnline'
import Conversation from '../conversation/Conversation'
import Header from '../header'
import axios from 'axios'
import Message from '../messages/Message'
import {io} from 'socket.io-client'
import './messenger.css'

function MessengerComponent() {
    const [newMessage, setNewMessage] = useState("");
    const [currentChat, setCurrentChat] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const socket = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { user } = useSelector((user) => ({ ...user }))
    const scrollRef = useRef();

    useEffect(() => {
        socket.current = io("https://bullionstatus.com/");
        console.log(socket.id)
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
              sender: data.senderId,
              text: data.text,
              createdAt: Date.now(),
            });
          });
    }, [])

    useEffect(() => {
        if(arrivalMessage && currentChat && currentChat.members && currentChat.members.includes(arrivalMessage.sender)){
            setMessages((prev) => [...prev, arrivalMessage]);
        }   
      }, [arrivalMessage,currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", user.id);
        socket.current.on("getUsers", (users) => {
            
            console.log(users)
            setOnlineUsers(users)
          });
        
      }, [user]);
    
    console.log(socket)

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/getConvOfUser/${user.id}`);
                console.log(res)
                setConversations(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, [user.id]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/getMessage/${currentChat._id}`);
                setMessages(res.data);
                console.log(res.data)
            } catch (err) {
                console.log(err);
            }
        };
        getMessages();
    }, [currentChat]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user.id,
            text: newMessage,
            conversationId: currentChat._id,
        };

        const receiverId = currentChat.members.find(
            (member) => member !== user.id
          );
      
          socket.current.emit("sendMessage", {
            senderId: user.id,
            receiverId,
            text: newMessage,
          });

        try {
            const res = await axios.post(`http://localhost:5000/addMessage`, message);
            console.log(res.data)
            setMessages([...messages, res.data]);
            console.log(messages)
            setNewMessage("");
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {

        if (scrollRef && scrollRef.current)
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    console.log(messages)
    return (
        <>
            <Header />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <h4 className='chatTitle'>Conversation with Friends</h4>
                        {/* <input placeholder="Search for friends" className="chatMenuInput" /> */}
                        {conversations.map((c) => (
                            <div onClick={() => setCurrentChat(c)}>
                                <Conversation conversation={c} currentUser={user} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ? (
                            <>
                                <div className="chatBoxTop">
                                    {messages.map((m) => (
                                        <div ref={scrollRef}>
                                            <Message message={m} own={m.sender === user.id} />
                                        </div>
                                    ))}
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea
                                        className="chatMessageInput"
                                        placeholder="write something..."
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        value={newMessage}
                                    ></textarea>
                                    <button className="chatSubmitButton" onClick={handleSubmit}>
                                        Send
                                    </button>
                                </div>
                            </>
                        ) : (<>
                             <img
      className="conversationImg nochatImage"
      src="../../../images/robot.gif"
      alt=""
    />
                            <p className="noConversationText">
                                Open a conversation to start a chat.
                            </p>
                        </>
                            
                        )}
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                    <h4 className='chatTitle'>Online Friends</h4>
                        {onlineUsers.map((onlineUser)=>(
                            <ChatOnline onlineUser={onlineUser}
                            currentId={user.id}
                            setCurrentChat={setCurrentChat}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MessengerComponent