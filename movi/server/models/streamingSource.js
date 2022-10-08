import mongoose from 'mongoose';
const { Schema, SchemaTypes, model } = mongoose;

const streamingSourceSchema = new Schema({
    title: {
        type: SchemaTypes.ObjectId,
        ref: "Title"
    },
    source_id: { type: Number, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    region: { type: String, required: true },
    web_url: { type: String, required: true },
    format: { type: String, required: true },
    price: { type: Number, default: null },
    seasons: { type: Number, required: true },
    episodes: { type: Number, required: true }
});

const StreamingSource = model('StreamingSource', streamingSourceSchema);

export default StreamingSource;