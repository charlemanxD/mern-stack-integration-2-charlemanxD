const User = require('../models/User');
const bcrypt = require('bcrypt');

// 1. @route POST /api/users
// @desc Create a user
// Access Public (Does not  Require JWT TOKEN)
exports.registerUser = async (req, res) => {
    const { username, email } = req.body;

    try {
        const plainPass = req.body.hashedPassword;
        if (!plainPass) {
            return res.status(400).json({ error: 'Password is required' });
        }
        // Hash password before saving to database
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(plain, salt);

        // shadow the outer variable so the later new User uses the hashed value
        const hashedPassword = hash;
        const newUser = new User({ username, email, hashedPassword });
        const savedUser = await newUser.save();

        // Backend response to Frontend with newUser data
        res.status(201).json({
            id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            hashedPassword: savedUser.hashedPassword
        });
    } catch (error) {
        // Console log if User creation FAILS
        console.error('Error creating new user:', error.message);
        // Backend response to Frontend if User creation FAILS
        res.status(500).send('Server error. Could not create a new user.');
    }
};















// const User = require('../models/User');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// // 
// const JWT_SECRET = process.env.JWT_SECRET

// // 1. @route POST /api/users
// // @desc Create a user
// // Access Public (Does not  Require JWT TOKEN)
// exports.registerUser = async (req, res) => {
//     const { username, email, hashedPassword } = req.body;

//     try {
//         // 1. Check email already exixt
//         let email = await User.findOne({ email });
//         if (email) {
//             return res.status(400).json({ msg: 'A user with  this email alredy exist.' });
//         }

//         // 2. Check if username is alredu taken
//         username = await User.findOne({ username });

//         if (username) {
//             return res.status(400).json({ msg: 'Username is alresy taken.' });
//         }

//         // PlainText passsword
//         const plainPass = req.body.hashedPassword;
//         //  Check if password field is empty
//         if (!plainPass) {
//             return res.status(400).json({ error: 'Password is required' });
//         }
//         // 3. Hash password
//         const salt = await bcrypt.genSalt(10);
//         const hash = await bcrypt.hash(plainPass``, salt);

//         // shadow the outer variable so the later new User uses the hashed value
//         const hashedPassword = hash;
//         // 4. Creating a newUser
//         const newUser = new User({ 
//             username, 
//             email, 
//             hashedPassword });
//         //Save newUser to the database
//         const savedUser = await newUser.save(); 

//         // 5. Creat JWT Payload
//         const payload = {
//             user: {
//                 id: user.id,
//                 email: user.email,
//                 username: user.username
//             }
//         };

//         // 6. Generate the token and send response
//         try {
//             const token = jwt.sign(
//                 payload,
//                 JWT_SECRET,
//                 { expiresIn: '2d' }
//             );

//             // Console log response if JWT token creation is a sccuess
//             console.log({ 
//                 token, user: user.email
//             });

//             // Backend response to the Frontend if JWT token creation successful
//             res.json({
//                 msg: `You are LOGGED-IN!, Welcome ${user.email}`,
//                 token: token // send to the FrontEnd 
//             });
//         } catch (jwtErr) {
//             // Console log, if JWT token creation FAILS
//             console.error('JWT SIGNING ERROR:', jwtErr.message);
//             // Backend response to FrontEnd, if JWT token creation FAILS
//             res.status(400).json('Token creation failed. Please try logging in');
//         }
//     } catch (error) {
//         // Console log, if User registration FAILS
//         console.error('Error registering a new user:', error.message);
//         // Backend response to Frontend if User creation FAILS
//         res.status(500).send('Server error during registration.');
//     }
// };