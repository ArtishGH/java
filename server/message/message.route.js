const express = require("express");
const router = express.Router();
const userService = require("./service");

// routes
router.get("/messages", (req, res) => res.redirect("/"));
router.post("/api/messages", userService.sendMessage);
router.post("/api/get-messages", userService.getMessage);
router.delete("/api/posts/:id", userService.deleteMessage);
router.put("/api/read-message/:id", userService.readMessage);
router.post('/api/email-amount', userService.getEmailsAmount)
module.exports = router;
