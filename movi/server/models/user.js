import mongoose from 'mongoose';
const { Schema, SchemaTypes, model } = mongoose;

// In order of relevance...
// https://mongoosejs.com/docs/subdocs.html
// https://mongoosejs.com/docs/schematypes.html#arrays
// https://stackoverflow.com/a/60682796
const userSchema = new Schema({
    _id: SchemaTypes.ObjectId,
    name: String,
    loginAuth: String,
    watchModes: [String],
    watchedTitles: [{
        watchedTitle: {
            type: SchemaTypes.ObjectId,
            ref: 'WatchedTitleSchema'
        }
    }],
    recommendedTitles: [{
        recommendedTitleSchema: {
            type: SchemaTypes.ObjectId,
            ref: 'WatchedTitleSchema'
        }
    }],
});

const User = model('User', userSchema);

export default User;