const User = require('../../models/user');
const Messages = require('../../models/message');
const addUser = async (req, res) => {
    const user = req.body;

    console.log(user);

    try {
        console.log(req.body);
        const user = await User.create(req.body);
        user.save()
    
        res.status(201).json({ user });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
};

const deleteUser = async (req, res) => {
    try {
        const users = await User.deleteOne( { _id: req.params.id } );
        return res.status(200).json({ success: true, users });

    } catch (err) {
        return res.status(400).json({ success: false });
    }

};


const getEmail = async (req, res) => {
    try {
        const users = await User.find();
        let emails = []
        users.forEach(user => {
            emails.push({value: user.email, label: user.email})
        })
        res.status(200).json({ emails });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
}

const getUsersAmount = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ lenght: users.length });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
}

const getMostActiveUser = async (req, res) => {
    try {
        const messages = await Messages.find();
        let users = [];
        messages.forEach(message => {
            if (message.sender) {
                users.push(message.sender);
            }
        })
        let mostActiveUser = users.sort((a, b) =>
            users.filter(v => v === a).length
            - users.filter(v => v === b).length
        ).pop();
        
        res.status(200).json({ mostActiveUser });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
}
module.exports = {
    addUser,
    getUsers,
    deleteUser,
    getEmail,
    getUsersAmount,
    getMostActiveUser
};