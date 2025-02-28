import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    profilePicture:{
        type: String,
        default: ''
    }
},{ timestamps: true });

userSchema.methods.generateAuthToken =async function() {
  const token=jwt.sign({id: this._id}, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
}

userSchema.statics.hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

const userModel = mongoose.model('User', userSchema);

export default userModel;