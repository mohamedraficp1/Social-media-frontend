import React, {useRef, useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import Picker from 'emoji-picker-react'
import { faClose, faCaretDown,faFaceSmile } from '@fortawesome/free-solid-svg-icons'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EmojiPickerBackground from './emojiPickerBackground';
import AddToYourPost from './addToYourPost';
import ImagrPreview from './imagrPreview';
import useClickOutside from '../../helpers/clickOutside';
import { createPost } from '../../functions/Post';
import PulseLoader from 'react-spinners/PulseLoader'
import PostError from './PostError';
import {uploadImages}  from '../../helpers/Upload-images';
import dataURItoBlob from '../../helpers/dataURItoBlob';


function CreatePostPopup({setVisible,setNewpost}) {
    const { user } = useSelector((user) => ({ ...user }));
    const [text, setText] = useState("");
    const [showPrev, setShowPrev] = useState(false);
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [error, setError] = useState("");
    const [background, setBackground] = useState("");
    const popup =useRef(null);
    useClickOutside(popup,()=>{setVisible(false)})
    const postSubmit = async () => {
        if (background) {
          setLoading(true);
          const response = await createPost(
            null,
            background,
            text,
            null,
            user.id,
            user.token
          );
          console.log(response)
          setLoading(false);
          if (response) {
            setBackground("");
            setNewpost ((prev)=>  !prev)
            setText("");
            setVisible(false);
          } else {
            setError(response);
          }
        } else if (images && images.length) {
          setLoading(true);
          const postImages = images.map((img) => {
            return dataURItoBlob(img);
          });
          const path = `${user.username}/post_Images`;
          let formData = new FormData();
          formData.append("path", path);
          postImages.forEach((image) => {
            formData.append("file", image);
          });
          const response = await uploadImages(formData, path, user.token);
          await createPost(null, null, text, response, user.id, user.token);
          setLoading(false);
          setText("");
          setImages("");
          setVisible(false);
        } else if (text) {
          setLoading(true);
          const response = await createPost(
            null,
            null,
            text,
            null,
            user.id,
            user.token
          );
          setLoading(false);
          if (response === "ok") {
            setBackground("");
            setText("");
            setVisible(false);
          } else {
            setError(response);
          }
        } else {
          console.log("nothing");
        }
      };
    return (
        <div className="blur">
            <div className="postBox" ref={popup}>
                {error && <PostError error ={error} setError={setError}/>}
                <div className="box_header">
                    <div className="small_circle" onClick={()=>{setVisible(false)}}>
                        <FontAwesomeIcon icon={faClose} />
                    </div>
                    <span>Create Post</span>
                </div>
                <div className="box_profile">
                    <img src={user.picture ? user.picture : "../../../images/default_pic.png"} alt="" className="box_profile_img" />
                    <div className="box_col">
                        <div className="box_profile_name">
                            {user.first_name} {user.last_name}
                        </div>
                        <div className="box_privacy">
                            <img src="../../../icons/public.png" alt="" />
                            <span>Public</span>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </div>
                    </div>
                </div>
                {!showPrev ? (
                    <>
                    
                     <EmojiPickerBackground user={user}  text={text} setText={setText} background={background} setBackground ={setBackground} />
                     </>
                ) : <ImagrPreview  user={user}  text={text} setText={setText} images={images} setShowPrev={setShowPrev} setImages={setImages}
                setError={setError} />}
               <AddToYourPost setShowPrev={setShowPrev} />
               <button className="post_submit" onClick={()=>{postSubmit()}}>
                {loading ? <PulseLoader color='#fff' size={5}/> : "Post"}
               </button>
            </div>

        </div>
    )
}

export default CreatePostPopup