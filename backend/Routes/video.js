const express = require('express');
const router = express.Router();
const videoController = require('../Controllers/video');
const auth = require('../Middlewares/authentication');

router.post('/video',auth,videoController.uploadVideo);
router.get('/allVideo',videoController.getAllVideo);
router.get('/getVideoById/:id',videoController.getVideoById);
router.get('/:userId/channel',videoController.getAllVideoByUserID);
// GET /api/allVideo?type=Anime

router.get('/allVideo', async (req, res) => {
    try {
        const { type } = req.query;
        const filter = type && type !== "All" ? { videoType: { $regex: new RegExp(type, 'i') } } : {};
        const videos = await Video.find(filter).populate("user");
        res.status(200).json({ videos });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch videos" });
    }
});

module.exports = router;