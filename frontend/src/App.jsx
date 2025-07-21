import { useState } from 'react'
import './App.css'
import Navbar from './Components/NavBar/navbar'
import HomePage from './Pages/HomePage/HomePage'
import { Route,Routes } from 'react-router-dom'
import Video from './Pages/Video/Video'
import Profile from './Pages/ProfilePage/ProfilePage'
import VideoUpload from './Pages/VideoUploadPage/VideoUploadPage'
import SignUp from './Pages/SignupPage/SignupPage'

function App() {
    const [sideNavbar,setSideNavbar] = useState(true)

    const setSideNavbarFunc=(val)=>{
      setSideNavbar(val)
    }
 
    return (
    <>
      <Navbar sideNavbar={sideNavbar} setSideNavbarFunc={setSideNavbarFunc} />
      <Routes>
        <Route path='/' element={<HomePage sideNavbar={sideNavbar}/>} />
        <Route path='/watch/:id' element={<Video/>} />
        <Route path='/user/:id' element={<Profile sideNavbar={sideNavbar}/>} />
        <Route path='/:id/upload' element={<VideoUpload/>} />  
        <Route path='/signup' element={<SignUp />} />  
      </Routes>
      
      
    </>
  )
}

export default App
