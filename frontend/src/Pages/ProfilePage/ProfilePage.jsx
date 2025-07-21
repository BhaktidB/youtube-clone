import React, { useState, useEffect } from 'react'
import './ProfilePage.css';
import SideNavbar from '../../Components/SideNavbar/SideNavbar';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = ({ sideNavbar }) => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [user, setUser] = useState(null);
    const fetchProfileData = async () => {
        axios.get(`http://localhost:3500/api/${id}/channel`).then((res)=>{
            console.log(res);
            setData(res.data.video)
            setUser(res.data.video[0]?.user)
        }).catch(err =>{console.log(err)})
    }
    useEffect(() => {
        fetchProfileData()
    }, [])

    return (
        <div className='profile'>
            <SideNavbar sideNavbar={sideNavbar} />

            <div className={sideNavbar ? "profile_page" : "profile_page_inactive"}>

{/* profile top */}
                <div className="profile_top_section">
                    <div className="profile_top_section_profile">
                        <img className='profile_top_section_img' src={user?.profilePic} alt="" />
                    </div>
                    <div className="profile_top_section_About">
                        <div className="profile_top_section_About_Name">
                            {user?.channelName}
                            <div className="profile_top_section_info">
                                {user?.userName} .  {data.length} Videos
                            </div>
                            <div className="profile_top_section_info">
                                {user?.about}
                            </div>
                        </div>
                    </div>
                </div>

{/* profile bottom */}
                <div className="profile_videos">
                    <div className="profile_videos_title">Videos &nbsp; <ArrowRightIcon /></div>

                    <div className="profileVideos">


                        {
                            data.map((item, key) => {
                                return (
                                    <Link to={`/watch/${item._id}`} className="profileVideo_block">

                                        <div className="profileVideo_block_thumbnail">
                                            <img src={item?.thumbnail} alt="" className="profileVideo_block_thumbnail_img" />
                                        </div>

                                        <div className="profileVideo_block_detail">
                                            <div className="profileVideo_block_detail_name">{item?.title}</div>
                                            <div className="profileVideo_block_detail_about">Created at {item?.createdAt.slice(0,10)}</div>
                                        </div>
                                    </Link>
                                );
                            })
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile