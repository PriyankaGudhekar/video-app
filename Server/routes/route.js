const router = require('express').Router();

/** Service Paths */
const addVideo = require('../services/addVideo')
const getVideos = require('../services/getVideos')

router.post('/addVideo', addVideo.addVideo)
router.get('/getVideos',getVideos.getVideos)
module.exports = router;