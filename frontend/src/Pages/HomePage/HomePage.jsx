import React from 'react'
import './HomePage.css'
import SideNavbar from '../../Components/SideNavbar/SideNavbar'
import Home from '../../Components/Home/Home'


const HomePage = ({sideNavbar}) => {
    return (
        <div className='home'>
            <SideNavbar sideNavbar={sideNavbar}/>
            <Home sideNavbar={sideNavbar}/>
            
        </div>
        )
}

export default HomePage