import React from 'react';
import {useSelector} from 'react-redux';
import { Feeling, LiveVideo, Photo } from "../../svg";
import "./style.css";
export default function CreatePost({setVisible}) {
  const { user } = useSelector((user) => ({ ...user }));
  return (
    <div className="createPost">
      <div className="createPost_header">
        <img src={user.picture ? user.picture: "../../../images/default_pic.png" } alt="" />
        <div className="open_post hover2" onClick={()=>{setVisible(true)}}>
          What's on your mind, {user.first_name ? user.first_name: ""}
        </div>
      </div>
      <div className="create_splitter"></div>
      <div className="createPost_body">
        <div className="createPost_icon hover1">
          <LiveVideo color="#f3425f" />
          Live Video
        </div>
        <div className="createPost_icon hover1">
          <Photo color="#4bbf67" />
          Photo/Video
        </div>
        <div className="createPost_icon hover1">
          <Feeling color="#f7b928" />
          Feeling/Activity
        </div>
      </div>
    </div>
  );
}
