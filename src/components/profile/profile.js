import React from 'react'
import axios from "axios";
import { useEffect,useState, useReducer } from "react";
import Header from '../header/index'
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { profileReducer } from "../../functions/reducers";
import ProfielPictureInfos from "./ProfielPictureInfos";
import ProfileMenu from "./ProfileMenu";
import Cover from "./cover";
import "./style.css";
import PplYouMayKnow from './PplYouMayKnow';

export default function Profiles() {
    const { username } = useParams();
    const [photos, setPhotos] = useState({});
    const navigate = useNavigate();
    const { user } = useSelector((state) => ({ ...state }));
    var userName = username === undefined ? user.username : username;
    
    console.log(userName)
    const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
        loading: false,
        profile: {},
        error: "",
    });
    useEffect(() => {
        getProfile();
    }, [userName]);
    var visitor = userName === user.username ? false : true;
    const path = `${userName}/*`;
    const max = 30;
     const sort = "desc";
    const getProfile = async () => {
        try {
            dispatch({
                type: "PROFILE_REQUEST",
            });
            console.log("datas")
            const { data } = await axios.get(
                `http://localhost:5000/getProfile/${userName}`,
                {
                    headers: {
                      Authorization: `Bearer ${user.token}`,
                    },
                  }
            );
            console.log("data")
            console.log(data)
            if (data.ok === false) {
                navigate("/profile");
            } else {
                try {
                    const images = await axios.post(
                      `${process.env.REACT_APP_BACKEND_URL}/listImages`,
                      { path, sort, max },
                      {
                        headers: {
                          Authorization: `Bearer ${user.token}`,
                        },
                      }
                    );
                    setPhotos(images.data);
                    
                  } catch (error) {
                    console.log(error);
                  }
                dispatch({
                    type: "PROFILE_SUCCESS",
                    payload: data,
                });
            }
        } catch (error) {
            console.log('error')
        }
    };
    
    return (
    <div className="profile">
        <Header />
        <div className="profile_top">
            <div className="profile_container">
                <Cover cover={profile.cover} />
                <ProfielPictureInfos profile={profile} visitor={visitor} photos={photos.resources}/>
                <ProfileMenu />
            </div>
        </div>
        <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <PplYouMayKnow />
          </div>
        </div>
      </div>
    </div>
    )
}