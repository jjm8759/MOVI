import mongoose from 'mongoose';
const { Schema } = mongoose;

const watchedTitleSchema = new Schema({
    watchmodeId: Number,
    title: String,
    favorited: {
        type: Boolean,
        default: false
    },
    userStars: {
        type: Number,
        default: -1
    }
});

export default watchedTitleSchema;