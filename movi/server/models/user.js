import mongoose from 'mongoose';
const { Schema, SchemaTypes, model } = mongoose;

// In order of relevance...
// https://mongoosejs.com/docs/subdocs.html
// https://mongoosejs.com/docs/schematypes.html#arrays
// https://stackoverflow.com/a/60682796
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true
    },
    watchModes: {
        type: [String],
        default: []
    },
    watchedTitles: {
        type: [{
            watchedTitle: {
                type: SchemaTypes.ObjectId,
                ref: 'WatchedTitle'
            }
        }],
        default: []
    },
    recommendedTitles: {
        type: [{
            recommendedTitle: {
                type: SchemaTypes.ObjectId,
                ref: 'RecommendedTitle'
            }
        }],
        default: []
    }
});

const User = model('User', userSchema);

export default User;