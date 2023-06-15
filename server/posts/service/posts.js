const MessageSchema = require('../../models/message')
const jwt = require('jsonwebtoken');

const posts = async (req, res) => {
    const token = req.body.token;
    const decoded = jwt.verify(token, 'admin4123');
    const messages = await MessageSchema.find({receiver: decoded.email});

    console.log(messages)
    return res.status(200).json({ success: true, posts: messages });
};
module.exports = {
    posts,
};