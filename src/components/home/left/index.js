import React from 'react';
import LeftLink from "./LeftLink";
import { useSelector } from 'react-redux';
import "./style.css";
import { left } from "../../../data/home";
import { Link } from "react-router-dom";
export default function LeftHome() {
  const { user } = useSelector((user) => ({ ...user }));
  return (
    <div className="left_home">
      <Link to="/profile" className="left_link hover1">
        <img src= "https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png" alt="" />
        <span>
        {user? user.first_name + " " + user.last_name : ""}
        </span>
      </Link>
      {left.slice(0, 8).map((link, i) => (
        <LeftLink
          key={i}
          img={link.img}
          text={link.text}
          notification={link.notification}
        />
      ))}
    </div>
  );
}
