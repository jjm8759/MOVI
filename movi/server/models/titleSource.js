import mongoose from 'mongoose';
const { Schema, SchemaTypes, model } = mongoose;

const titleSourceSchema = new Schema({
    title: {
        type: SchemaTypes.ObjectId,
        ref: "Title",
        required: true
    },
    provider: {
        type: SchemaTypes.ObjectId,
        ref: "Provider",
        required: true
    },
    source_id: { type: Number, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    region: { type: String, required: true },
    web_url: { type: String, required: true },
    format: { type: String, required: true },
    price: { type: Number, default: null },
    seasons: { type: Number, default: null },
    episodes: { type: Number, default: null }
});

const TitleSource = model('TitleSource', titleSourceSchema);

export default TitleSource;