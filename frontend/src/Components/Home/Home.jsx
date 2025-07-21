import React, { useEffect, useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = ({ sideNavbar }) => {
  const [data, setData] = useState([]);
  const [selectedType, setSelectedType] = useState('All');

  const options = ["All", "Anime", "Music", "Kpop", "Gaming", "Comedy"];


  useEffect(() => {
    axios
      .get(`http://localhost:3500/api/allVideo?type=${selectedType}`)
      .then(res => {
        setData(res.data.videos);
      })
      .catch(err => {
        console.log(err);
      });
  }, [selectedType]); // ⬅️ Re-fetch when category changes

  return (
    <div className={sideNavbar ? 'homePage' : 'fullHomePage'}>
      <div className="homePage_options">
        {options.map((item, index) => (
          <div
            key={index}
            className={`homePage_option ${selectedType === item ? 'activeOption' : ''}`}
            onClick={() => setSelectedType(item)}
          >
            {item}
          </div>
        ))}
      </div>

      <div className={sideNavbar ? "home_mainPage" : "home_mainPageWithoutLink"}>
        {data?.map((item, ind) => (
          <Link to={`/watch/${item._id}`} className="youtube_Video" key={item._id}>
            <div className="youtube_thumbnailBox">
              <img src={item.thumbnail} alt="thumbnail" className="youtube_thumbnailPic" />
              <div className="youtube_timingThumbnail">30</div>
            </div>

            <div className="youtubeTitleBox">
              <div className="youtubeTitleBoxProfile">
                <img src={item?.user?.profilePic} alt="profile pic" className="youtube_thumbnail_Profile" />
              </div>

              <div className="youtubeTitleBox_Title">
                <div className="youtube_videoTitle">{item?.title}</div>
                <div className="youtube_channelName">{item?.user?.channelName}</div>
                <div className="youtubeVideo_views">{item?.like} likes</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
