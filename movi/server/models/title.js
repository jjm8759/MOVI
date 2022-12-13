/**
 * A Title document contains user-agnostic title data, such as:
 *      - the title's ID in the watchmode API
 *      - the title (as in the name) of the title
 *      - the movie's critic star rating
 *      - the movie's public star rating
 *      - the url to the movie's poster
 *      ... any other data our application might use...
 * The Title schema defines the document layout for the Titles collection.
 * The Title model takes the schema and applies it to each document in the 
 *      collection.
 * Models are responsible for all document interactions like creating, reading, 
 *      updating, and deleting (CRUD).
 */

import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const titleSchema = new Schema({
    watchmodeId: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    plot_overview: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        required: true
    },
    runtime_minutes: {
        type: Number,
        default: null
    },
    year: {
        type: Number,
        default: null
    },
    genre_names: {
        type: [String],
        default: []
    },
    user_rating: {
        type: Number,
        default: null
    },
    critic_score: {
        type: Number,
        default: null
    },
    us_rating: {
        type: String,
        default: null
    },
    poster: {
        type: String,
        default: null
    },
    backdrop: {
        type: String,
        default: null
    },
    similar_titles: { 
        type: [Number], 
        default: []
    },
    trailer: {
        type: String,
        default: null
    },
    trailer_thumbnail: {
        type: String,
        default: null
    }
});

const Title = model('Title', titleSchema);

export default Title;