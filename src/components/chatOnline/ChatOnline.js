import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './chatOnline.css'

export default function ChatOnline({onlineUser, currentId, setCurrentChat }) {
console.log(onlineUser)
const [onlineUserDetail, setOnlineUserDetail]= useState("")
useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios(`http://localhost:5000/getUser/${onlineUser.userId}`);
        setOnlineUserDetail(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [onlineUser]);

  const handleClick = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/find/${currentId}/${onlineUser.userId}`
      );
      
      if(res.data===null){
        const response = await axios.post(
            `http://localhost:5000/newConv`, {senderId:currentId, receiverId:onlineUser.userId }
          );
          setCurrentChat(response.data);
      }
      else {
        setCurrentChat(res.data);
      }
      console.log(res)
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="chatOnline"  onClick={() => handleClick()}>
      
        <div className="chatOnlineFriend" >
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src="../../../images/default_pic.png"
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{`${onlineUserDetail.first_name} ${onlineUserDetail.last_name}`}</span>
        </div>
     
    </div>
  )
}
