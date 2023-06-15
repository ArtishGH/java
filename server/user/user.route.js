const express = require('express');
const router = express.Router();
const userService = require('./service');

router.get("/send", (req, res) => res.redirect("/"));
router.post('/api/user', userService.addUser)
router.get('/api/user', userService.getUsers)
router.delete('/api/user/:id', userService.deleteUser)
router.get('/api/user-email-get', userService.getEmail)
router.post('/api/user-amount', userService.getUsersAmount)
router.post('/api/user-most-active', userService.getMostActiveUser)
module.exports = router;
