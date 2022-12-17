
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag,faMicrophone,faMap } from '@fortawesome/free-solid-svg-icons'
import { Dots, Feeling, Photo } from "../../svg";
export default function AddToYourPost({setShowPrev}) {
  return (
    <div className="addtoyourpost">
      <div className="addto_text">Add to your post</div>
      <div className="post_header_right hover1" onClick={()=>{
        setShowPrev(true)
      }}>
        <Photo color="#45bd62" />
      </div>
      <div className="post_header_right hover1">
      <FontAwesomeIcon icon={faTag} />
      </div>
      <div className="post_header_right hover1">
        <Feeling color="#f7b928" />
      </div>
      <div className="post_header_right hover1">
      <FontAwesomeIcon icon={faMap} />
      </div>
      <div className="post_header_right hover1">
        <FontAwesomeIcon icon={faMicrophone} />
      </div>
      <div className="post_header_right hover1">
        <Dots color="#65676b" />
      </div>
    </div>
  );
}