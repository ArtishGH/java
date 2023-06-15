const Message = require('../../models/message');
const User = require('../../models/user');

const sendMessage = async (req, res) => {
    const { title, content, receiver, sender } = req.body;
    const user = await User.findOne({ email: receiver });
    const data = { title, content, receiver, sender: user.email };
    const message = new Message(data);
    try {
        console.log(message);
        const savedMessage = await message.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

const getMessage = async (req,res) => {
    const message = await Message.find({$or: [{ sender: req.body.email }, { receiver: req.body.email }]});
    
    try {
        res.status(200).json(message);
    }
    catch (err) {
        res.status(err.status).json(err);
    }
};

const deleteMessage = async (req, res) => {
    console.log(req.params.id);
    try {
        const message = await Message.findById(req.params.id);
        await message.delete();
        res.status(200).json("Wiadomość została usunięta");
    } catch (err) {
        res.status(500).json(err);
    }
};


const readMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        await message.updateOne({ $set: { read: true } });
        res.status(200).json("Wiadomość została oznaczona jako przeczytana");
    } catch (err) {
        res.status(500).json(err);
    }
};

const getEmailsAmount = async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json({ lenght: messages.length });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
}

module.exports = {
    sendMessage,
    getMessage,
    deleteMessage,
    readMessage,
    getEmailsAmount 
};