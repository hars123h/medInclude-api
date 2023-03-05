const User = require('../models/user');
const jwt = require('jsonwebtoken');

const crypto = require('crypto');
const sgMail = require('@sendgrid/mail'); // SENDGRID_API_KEY
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const smsKey = process.env.SMS_SECRET_KEY;







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
        const token = jwt.sign({ _id: user._id }, 'pijisadkjfkldsazjvklzsdndvklnzxclkvnxdlkzcvnkldzfxnvsddljnjkawdshnsd', { expiresIn: '7d' });
        const { _id, firstName, lastName, uniqueId, role } = user;

        return res.json({
            token,
            user: { _id, firstName, lastName, uniqueId, role }
        });
    });
}

exports.sendOtp = (req, res) => {
    const { uniqueId } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp);

    const ttl = 2 * 60 * 1000;
    const expires = Date.now() + ttl;
    const data = `${uniqueId}.${otp}.${expires}`;
    const hash = crypto.createHmac('sha256', smsKey).update(data).digest('hex');
    const fullHash = `${hash}.${expires}`;

    User.findOne({ uniqueId: uniqueId }, (err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is taken'
            });
        }
        const emailData = {
            from: process.env.EMAIL_FROM,
            to: uniqueId,
            subject: `Account activation link`,
            html: `
            Your OTP is ${otp}
        `
        };

        sgMail.send(emailData).then(sent => {
            return res.json({uniqueId, hash: fullHash, otp});
        });
        
    });
};

exports.verifyOtp = (req, res) => {
    const uniqueId = req.body.uniqueId;
	const hash = req.body.hash;
	const otp = req.body.otp;
	let [ hashValue, expires ] = hash.split('.');

	let now = Date.now();
	if (now > parseInt(expires)) {
		return res.status(504).send({ msg: 'Timeout. Please try again' });
	}
	let data = `${uniqueId}.${otp}.${expires}`;
	let newCalculatedHash = crypto.createHmac('sha256', smsKey).update(data).digest('hex');
	if (newCalculatedHash === hashValue) {
		console.log('user confirmed');
		res.send({ msg: 'Email verified' });
	} else {
		console.log('not authenticated');
		return res.status(400).send({ verification: false, msg: 'Incorrect OTP' });
	}
}


exports.requireSignin = async function (req, res, next) {
    
    if(req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, 'pijisadkjfkldsazjvklzsdndvklnzxclkvnxdlkzcvnkldzfxnvsddljnjkawdshnsd');
        req.user = user;
        
    }
    else {
        return res.status(400).json({message: 'Authorization Required'})
    }
    next();
};




