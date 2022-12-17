import React, { useRef } from 'react'
import EmojiPickerBackground from './emojiPickerBackground'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages} from "@fortawesome/free-regular-svg-icons"

function ImagrPreview({ user, text, setText, images, setImages,setShowPrev, setError }) {
    const imageInputRef = useRef(null);
    const handleImages = (e) => {
        console.log("iigggii");
        let files= Array.from(e.target.files)
        files.forEach((img) => {
          if(img.type !== "image/jpeg" &&
          img.type !== "image/png" &&
        img.type !== "image/webp" &&
        img.type !== "image/gif"){
            setError(`${img.name} File format is not supported`)
            files = files.filter((item)=> item.name !== images.name)
            return
          }
          else if (img.size > 1024 * 1024) {
            setError(`${img.name} File size is too large`)
            return
          }
            const reader =new FileReader
            reader.readAsDataURL(img)
            reader.onload = (readerEvent) => {
                setImages((images) => [...images, readerEvent.target.result]);
            };
        });
        
    }

    console.log(images)
    return (
        <div className='overflow_a scrollbar'>
            <EmojiPickerBackground user={user} text={text} setText={setText} type2 />
            <div className="add_pics_wrap">
                <input
                    type="file"
                    accept="image/jpeg, image/png, image/webp, image/gif"
                    multiple
                    hidden
                    ref={imageInputRef}
                    onChange={handleImages}
                />
                {images && images.length ? (
          <div className="add_pics_inside1 p0">
            <div className="preview_actions">
              <button className="hover1">
                <i className="edit_icon"></i>
                Edit
              </button>
              <button
                className="hover1"
                onClick={() => {
                  imageInputRef.current.click();
                }}
              >
                <i className="addPhoto_icon"></i>
                Add Photos/Videos
              </button>
            </div>
            <div
              className="small_white_circle"
              onClick={() => {
                setImages([]);
              }}
            >
              <i className="exit_icon"></i>
            </div>
            <div
              className={
                images.length === 1
                  ? "preview1"
                  : images.length === 2
                  ? "preview2"
                  : images.length === 3
                  ? "preview3"
                  : images.length === 4
                  ? "preview4 "
                  : images.length === 5
                  ? "preview5"
                  : images.length % 2 === 0
                  ? "preview6"
                  : "preview6 singular_grid"
              }
            >
              {images.map((img, i) => (
                <img src={img} key={i} alt="" />
              
              ))}
            </div>
          </div>
        ) : (
                    <div className="add_pics_inside1">
                        <div className="small_white_circle" onClick={()=>{setShowPrev(false)}}>
                            <i className="exit_icon"></i>
                        </div>
                        <div
                            className="add_col"
                            onClick={() => {
                                imageInputRef.current.click();
                            }}
                        >
                            <div className="add_circle">
                                <i className="addPhoto_icon"></i>
                                <FontAwesomeIcon icon={faImages} />
                            </div>
                            <span>Add Photos/Videos</span>
                            <span>or drag and drop</span>
                        </div>
                    </div>
                )}
                <div className="add_pics_inside2">
                    <div className="add_circle">
                        <i className="phone_icon"></i>
                    </div>
                    <div className="mobile_text">Add phots from your mobile device.</div>
                    <span className="addphone_btn">Add</span>
                </div>
            </div>
        </div>

    )
}

export default ImagrPreview