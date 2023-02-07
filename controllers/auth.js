const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { log } = require('console');
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;





exports.register = (req, res) => {
    const { firstName, lastName, uniqueId, password } = req.body;
   

    User.findOne({ uniqueId }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Id is taken'
            });
        }

        const newUser = new User({ firstName, lastName, uniqueId, password });

        newUser.save((err, user) => {
            if (err) {
                console.log('SAVE USER IN ACCOUNT ACTIVATION ERROR', err);
                return res.status(400).json({
                    error: 'err'
                });
            }
            if(user) {
            return res.json({
                message: 'Signup success. Please signin.'
            });
        }
        });
    });

}

exports.login = (req, res) => {
    const { uniqueId, password } = req.body;
    // check if user exist
    User.findOne({ uniqueId }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that Id does not exist. Please signup'
            });
        }
        // authenticate
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Id and password do not match'
            });
        }
        // generate a token and send to client
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        const { _id, firstName, lastName, uniqueId, role } = user;

        return res.json({
            token,
            user: { _id, firstName, lastName, uniqueId, role }
        });
    });
}



exports.requireSignin = async function (req, res, next) {
    if(req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
    
        const user = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = user
    }
    else {
        return res.status(400).json({message: 'Authorization Required'})
    }
    next();
};
