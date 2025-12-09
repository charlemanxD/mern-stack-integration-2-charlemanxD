const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            required: true,
            maxlength: [35, 'username cannot be more than 35 characters']
        },

        email: {
            type: String,
            required: true,
            trim: true,
            maxlength: [100, 'email cannot be more than 35 characters']
        },
        
        hashedPassword: {
            type: String,
            requires: true
        },

        createdAt: {
            type: Date,
            default: Date.now
        }
    });


    module.exports = mongoose.model('User', UserSchema); 