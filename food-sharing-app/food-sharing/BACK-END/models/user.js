const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    phoneNum: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    address: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    address2: {
        type: String,
        required: false,
        minlength: 5,
        maxlength: 255
    },
    city: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    state: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    zipCode: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    isAdmin: Boolean
});
          
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            isAdmin: this.isAdmin
        },
        config.get("jwtPrivateKey")
    );
    return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
    const schema = {

        username: Joi.string()
            .min(5)
            .max(255)
            .required()
            .email(),
        password: Joi.string()
            .min(5)
            .max(255)
            .required(),
        phoneNum: Joi.string()
            .min(5)
            .max(255)
            .required(),
        address: Joi.string()
            .min(5)
            .max(255)
            .required(),
        address2: Joi.string()
            .min(5)
            .max(255)
            .optional(),
        city: Joi.string()
            .min(5)
            .max(255)
            .required(),
        state: Joi.string()
            .min(5)
            .max(255)
            .required(),
        zipCode: Joi.string()
            .min(5)
            .max(255)
            .required(),
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
