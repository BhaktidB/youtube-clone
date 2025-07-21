var express = require("express");
var app = express();
var port = 3500
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cors({
    // to integrate with frontend
    origin: 'http://localhost:5173',
    credentials: true
  }))

app.use(express.json());
app.use(cookieParser());
require('./Connection/config');

const AuthRoutes = require('./Routes/user');
const VideoRoutes = require('./Routes/video');
const CommentRoutes = require('./Routes/comment');

app.use('/auth',AuthRoutes);
app.use('/api',VideoRoutes);
app.use('/commentApi',CommentRoutes);


app.listen(port,()=>{console.log(`Server is running on port ${port}`)});