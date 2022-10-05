import mongoose from 'mongoose';
const { Schema, SchemaTypes, model } = mongoose;

const recommendedTitleSchema = new Schema({
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
    watchlinkClicked: {
        type: Boolean,
        default: false
    },
    clickActionDate: {
        type: Date,
        default: null
    }
});

const RecommendedTitle = model('RecommendedTitle', recommendedTitleSchema);

export default RecommendedTitle;