const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const data = req.body;

    try {
        const user = await User.findOne({ 'email': data.email });

        if (!user) return res.status(200).json({ success: false });
        
        if (data.password === user.password) {
            const token = jwt.sign({email: user.email}, 'admin4123')
            let role = 'user'
            if (user.admin) role = 'admin'
            return res.status(200).json({ success: true, role, token, email: user.email });
        } else {
            return res.status(200).json({ success: false });
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false });   
    }
};

module.exports = {
    login,
};