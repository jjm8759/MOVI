import mongoose from 'mongoose';
const { Schema, SchemaTypes, model } = mongoose;

const watchedTitleSchema = new Schema({
    user: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: SchemaTypes.ObjectId,
        ref: 'Title',
        required: true
    },
    favorited: {
        type: Boolean,
        default: false
    },
    userStars: {
        type: Number,
        default: -1 // -1 for has not been rated by the user
    },
    lastWatched: {
        type: Date,
        default: () => Date.now()
    }
});

const WatchedTitle = model('WatchedTitle', watchedTitleSchema);

export default WatchedTitle;