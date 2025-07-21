import React, { useEffect, useState } from 'react'
import './navbar.css'
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../Login/Login';
import axios from 'axios';
const Navbar = ({ setSideNavbarFunc, sideNavbar }) => {

    const [userPic, setUserPic] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1084px-Unknown_person.jpg")
    const [login, setLogin] = useState(false)
    const [navbarModal, setNavbarModal] = useState(false);
    const [isLogedIn, setIsLogedIn] = useState(false);
    const navigate = useNavigate();

    const handleClickModal = () => {
        setNavbarModal(!navbarModal)
    }

    const sideNavbarFunc = () => {
        setSideNavbarFunc(!sideNavbar)
    }

    const handleProfile = () => {
        let userId = login.getItem("userId")
        navigate(`/user/${userId}`);
        setNavbarModal(false);
    }

      const setLoginModal=()=>{
    setLogin(false);
  }

    const onclickOfPopUpOption=(button)=>{
        setNavbarModal(false)
        if(button==="login"){
            setLogin(!login)
        }else{
            localStorage.clear();
            getLogoutFun()
            
            setTimeout(()=>{
                navigate('/')
                window.location.reload()
            },2000)
        
        }
    }

    const getLogoutFun = ()=>{
        axios.post("http://localhost:3500/auth/logout",{},{withCredentials:true}).then((res)=>{
            console.log("logout")
        }).catch((err)=>{
            console.log(err)

        })
    }

    useEffect(()=>{
        let userProfilePic = localStorage.getItem("userProfilePic")
        setIsLogedIn(localStorage.getItem("userId")!==null?true:false);
        if(userProfilePic!==null){
            setUserPic(userProfilePic)
        }
    
    },[])

    return (
        <div className='navbar'>
            <div className="navbar-left">
                <div className="navHamburger">
                    <MenuIcon sx={{ color: "white" }} onClick={sideNavbarFunc} />
                </div>


                <Link to={'/'} className="navbar_youtubeImg">
                    <YouTubeIcon sx={{ fontSize: "34px" }} className="navbar_youtubeImage" />
                    <div className="navbar_youtubeTitle">YouTube</div>
                </Link>
            </div>

            <div className="navbar-middle">
                <div className="navbar_searchBox">
                    <input type="text" className='navbar_searchBoxInput' placeholder='Search' name="" id="" />
                    <div className="navbar_searchIconBox">
                        <SearchIcon sx={{ fontSize: "28px", color: "white" }} />
                    </div>
                    <div className="navbar_mic">
                        <MicIcon sx={{ color: "white" }} />
                    </div>
                </div>
            </div>

            <div className="navbar-right">
                <Link to={'/222/upload'}>
                    <VideoCallIcon sx={{ fontSize: "30px", cursor: "pointer", color: "white" }} />

                </Link>
                <NotificationsIcon sx={{ fontSize: "30px", cursor: "pointer", color: "white" }} />
                <img onClick={handleClickModal} src={userPic} alt="LOGO" className="navbar-right-logo" />

                {navbarModal &&
                    <div className="navbar-modal">
                       {isLogedIn && <div className="navbar-modal-option" onClick={handleProfile}>Profile</div>}
                        {isLogedIn && <div className="navbar-modal-option" onClick={()=>onclickOfPopUpOption("logout")}>Logout</div>}
                        {!isLogedIn && <div className="navbar-modal-option" onClick={()=>onclickOfPopUpOption("login")}>Login</div>}

                    </div>}


            </div>
            {login && <Login setLoginModal={setLoginModal}/>}

        </div>
    )
}

export default Navbar;