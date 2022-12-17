import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './Conversation.css'

function Conversation({ conversation, currentUser }) {
    const [user, setUser] = useState([]);
    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser.id);
        const getUser = async () => {
          try {
            const res = await axios(`http://localhost:5000/getUser/${friendId}`);
            setUser(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getUser();
      }, [currentUser, conversation]);
     console.log(user)
  return (
    <div className="conversation">
    <img
      className="conversationImg"
      src="../../../images/default_pic.png"
      alt=""
    />
    <span className="conversationName">{`${user.first_name} ${user.last_name}`}</span>
  </div>
  )
}

export default Conversation