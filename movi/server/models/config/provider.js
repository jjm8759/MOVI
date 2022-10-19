import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const providerSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    type: { type: String, default: null },
    logo_100px: { type: String, default: null },
    regions: { type: [String], default: [] }
});

const Provider = model('Provider', providerSchema);

export default Provider;