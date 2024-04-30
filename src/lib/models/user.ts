import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    coursesEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    }],

});

export const User = mongoose.model('User', userSchema);

