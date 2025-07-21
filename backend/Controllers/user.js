const User = require('../Modals/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const cookieOptions = {
    httpOnly: true,
    secure: false, 
    sameSite: 'Lax'
  
};

exports.signUp = async(req,res)=>{
    try{
        const { channelName, userName, about, profilePic, password } = req.body;
        const isExist = await User.findOne({ userName });
        
        if(isExist){
            res.status(400).json({error:"User already exists"});
        }else{

            let updatedPass = await bcrypt.hash(password,10);
            const user = new User({channelName, userName, about, profilePic, password : updatedPass});
            await user.save();
            res.status(201).json({message:"User Registration Successful", data:user})
        }
        
    } catch (error){
        res.status(500).json({ error: 'Server error' });
    }
}

// exports.login = async (req,res)=>{
//     try{
//         const { userName, password } = req.body;
//         const user = await User.findOne({ userName });

//         if(user && await bcrypt.compare(password,user.password)){
//             const token = jwt.sign({userId:user._id},"uihuidhufhdufhuihfui",cookieOptions)
//             res.cookie('token',token,cookieOptions)
//             res.json({message:"Logged in successfully", token, user})
//         }else{
//             res.status(400).json({error:"Invalid Password"})
//         }

//     } catch (errorMsg){
//         // res.json(errorMsg)
//         res.status(500).json({ error: errorMsg });
//     }
// }

exports.login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.cookie('token', token, cookieOptions);
            return res.status(200).json({ message: "Logged in successfully", token, user });
        } else {
            return res.status(400).json({ error: "Invalid username or password" });
        }

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


exports.logout = async(req,res)=>{
    res.clearCookie('token', cookieOptions).json({ message: 'Logged out successfully' });
}