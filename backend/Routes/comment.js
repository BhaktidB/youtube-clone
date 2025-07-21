const express = require('express');
const router = express.Router();
const CommentController = require('../Controllers/comment');
const auth = require('../Middlewares/authentication');


router.post('/comment',auth,CommentController.addComment);
router.get('/comment/:videoId',CommentController.getCommentByVideoId);


module.exports = router;