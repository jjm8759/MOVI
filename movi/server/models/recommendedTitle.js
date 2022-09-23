import mongoose from 'mongoose';
const { Schema } = mongoose;

const recommendedTitleSchema = new Schema({
    watchmodeId: Number,
    title: String,
    watchlinkClicked: {
        type: Boolean,
        default: false
    },
    clickActionDate: Date,
});

export default recommendedTitleSchema;