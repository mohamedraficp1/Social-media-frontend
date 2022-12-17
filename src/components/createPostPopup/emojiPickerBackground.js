import React, {useRef, useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import Picker from 'emoji-picker-react'
import { faClose, faCaretDown,faFaceSmile } from '@fortawesome/free-solid-svg-icons'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function EmojiPickerBackground({text,setText , user, type2,background,setBackground}) {
  console.log(text)
    const [cursorPosition, setCursorPosition] = useState();
    const [picker, setPicker] = useState(false);
    const [showBgs, setShowBgs] = useState(false);
    const textRef = useRef(null);
    const bgRef = useRef(null);
    useEffect(() => {
        textRef.current.selectionEnd = cursorPosition;
      }, [cursorPosition]);
    const handleEmoji = (e,{emoji} )=>{
        const ref= textRef.current;
        ref.focus();
        const start = text.substring(0, ref.selectionStart)
        const end = text.substring(ref.selectionStart)
        const newText = start + emoji + end
        setText(newText)
        setCursorPosition(start.length + emoji.length);
    }
    const backgroundHanlder= (i)=>{
        bgRef.current.style.backgroundImage = `url(${postBackgrounds[i]})`;
        setBackground(postBackgrounds[i]);
        bgRef.current.classList.add("bgHandler");
    }
    const removeBackground = (i) => {
        bgRef.current.style.backgroundImage = "";
        setBackground("");
        bgRef.current.classList.remove("bgHandler");
      };

    const postBackgrounds = [
        "../../../images/postBackgrounds/1.jpg",
        "../../../images/postBackgrounds/2.jpg",
        "../../../images/postBackgrounds/3.jpg",
        "../../../images/postBackgrounds/4.jpg",
        "../../../images/postBackgrounds/5.jpg",
        "../../../images/postBackgrounds/6.jpg",
        "../../../images/postBackgrounds/7.jpg",
        "../../../images/postBackgrounds/8.jpg",
        "../../../images/postBackgrounds/9.jpg",
      ];
    return (
        <div className={type2 ? "images_input" : ""}>
        <div className={!type2 ? "flex_center" : ""} ref={bgRef}>
                        <textarea
                            maxLength="100" 
                            ref={textRef}
                            value={text}
                            placeholder={`What's on your mind, ${user.first_name}`}
                            className={`post_input ${type2 ? "input2" : ""}`}
                            onChange={(e) => setText(e.target.value)}
                            style={{
                                paddingTop: `${
                                  background
                                    ? Math.abs(textRef.current.value.length * 0.1 - 32)
                                    : "0"
                                }%`,
                              }} 
                        ></textarea>
                    </div>
        <div className={!type2 ? "post_emojis_wrap" : ""}>
            <div className={`comment_emoji_picker ${
              type2 ? "movepicker2" : "rlmove"
            }`}>
                {picker && <Picker onEmojiClick={handleEmoji} />}
            </div>
            {!type2 &&<img src="../../../icons/colorful.png" alt="" onClick={()=>setShowBgs((prev)=>(!prev))} />}
            {!type2 && showBgs && (
          <div className="post_backgrounds">
            <div
              className="no_bg"
              onClick={() => {
                removeBackground();
              }}
            ></div>
            {postBackgrounds.map((bg, i) => (
              <img
                src={bg}
                key={i}
                alt=""
                onClick={() => {
                    backgroundHanlder(i);
                }}
              />
            ))}
          </div>
        )}
            <FontAwesomeIcon icon={faFaceSmile} onClick={() => setPicker(prev => !prev)} />
        </div>
        </div>
    )
}

export default EmojiPickerBackground