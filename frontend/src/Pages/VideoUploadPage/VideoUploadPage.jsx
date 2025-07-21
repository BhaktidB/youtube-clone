import React, { useState, useEffect } from 'react';
import './videoUploadPage.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const VideoUpload = () => {
    const [inputField, setInputField] = useState({
        title: "",
        description: "",
        videoLink: "",
        thumbnail: "",
        videoType: ""
    });
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    const handleOnChangeInput = (event, name) => {
        setInputField({
            ...inputField,
            [name]: event.target.value
        });
    };

    const uploadImage = async (e, type) => {
        setLoader(true);
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'youtube-clone');

        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/dmbd7hdff/${type}/upload`, data);
            const url = response.data.url;
            const val = type === "image" ? "thumbnail" : "videoLink";
            setInputField({ ...inputField, [val]: url });
        } catch (err) {
            alert("Upload failed. Please try again.");
            console.error(err);
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        if (!localStorage.getItem("userId")) {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmitFunc = async () => {
        setLoader(true);
        try {
            await axios.post(`http://localhost:3500/api/video`, inputField, { withCredentials: true });
            alert("Video uploaded successfully!");
            setInputField({
                title: "",
                description: "",
                videoLink: "",
                thumbnail: "",
                videoType: ""
            });
            navigate('/');
        } catch (err) {
            console.error(err);
            alert("Upload failed. Check your input and try again.");
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className='videoUpload'>
            <div className="uploadBox">
                <div className="uploadVideoTitle">
                    <YouTubeIcon sx={{ fontSize: "54px", color: "red" }} />
                    Upload Video
                </div>

                <div className="uploadForm">
                    <input
                        type="text"
                        value={inputField.title}
                        onChange={(e) => handleOnChangeInput(e, "title")}
                        placeholder='Video Title'
                        className='uploadFormInputs'
                    />
                    <input
                        type="text"
                        value={inputField.description}
                        onChange={(e) => handleOnChangeInput(e, "description")}
                        placeholder='Video Description'
                        className='uploadFormInputs'
                    />
                    {/* <input
                        type="text"
                        value={inputField.videoType}
                        onChange={(e) => handleOnChangeInput(e, "videoType")}
                        placeholder='Video Category'
                        className='uploadFormInputs'
                    /> */}
                    <select
                        className='uploadFormInputs'
                        value={inputField.videoType}
                        onChange={(e) => handleOnChangeInput(e, "videoType")}
                    >
                        <option value="">Select Category</option>
                        <option value="All">All</option>
                        <option value="Anime">Anime</option>
                        <option value="Music">Music</option>
                        <option value="Kpop">Kpop</option>
                        <option value="Gaming">Gaming</option>
                        <option value="Comedy">Comedy</option>
                    </select>

                    <div>Thumbnail <input type="file" accept='image/*' onChange={(e) => uploadImage(e, "image")} /></div>
                    <div>Video <input type="file" accept='video/*' onChange={(e) => uploadImage(e, "video")} /></div>

                    {
                        loader && <Box sx={{ display: 'flex' }}><CircularProgress /></Box>
                    }
                </div>

                <div className="uploadBtns">
                    <div className="uploadBtn-form" onClick={handleSubmitFunc}>Upload</div>
                    <Link to={'/'} className="uploadBtn-form">Home</Link>
                </div>
            </div>
        </div>
    );
};

export default VideoUpload;
