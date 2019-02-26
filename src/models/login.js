var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const async = require('async');
require('dotenv').config()
const JWT = require('jsonwebtoken');

const Email = require('mongoose-type-mail');

const UserSchema = new Schema({
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    email:{type:Email, required:true, index: {unique: true} },
    password: { type: String, required: true },
    moderator: {type: String, enum: ['Super Admin', 'State Admin', 'Center Admin', 'Teacher']},
    HeadPlace: String,
    isLogin: Boolean,
    Date: {type: Date, default: Date.now}
}, { collection: 'users' });


UserSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email: email }).exec();
    if (!user) return false;
    const doesMatch = await bcrypt.compare(password, user.password);
    return doesMatch ? user : false;
};

UserSchema.statics.generateToken = function(id){
	const token = JWT.sign(id.toJSON(), process.env.API_SECRET_KEY);
	return token
}

UserSchema.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

const User = mongoose.model('User', UserSchema)
module.exports = User;
