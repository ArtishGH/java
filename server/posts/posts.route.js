const express = require('express');
const router = express.Router();
const postsService = require('./service');

router.post('/api/posts', postsService.posts);

module.exports = router;
