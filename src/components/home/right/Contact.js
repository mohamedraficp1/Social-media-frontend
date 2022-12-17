import React from 'react';
export default function Contact({ user }) {
  return (
    <div className="contact hover3">
      <div className="contact_img">
        <img src={user.picture ? user.picture : "https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png"} alt="" />
      </div>
      <span>
        {user.first_name} {user.last_name}
      </span>
    </div>
  );
}
