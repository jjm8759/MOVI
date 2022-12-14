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
    passwordHash: {
        type: String,
        required: true
    },
    sessionToken: {
        type: String,
        required: true
    },
    watchModes: {
        type: [String],
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const User = model('User', userSchema);

export default User;