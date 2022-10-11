import dotenv from 'dotenv';
import fetch from './fetch.js';
dotenv.config();

import StreamingSource from '../models/streamingSource.js';
import Title from '../models/title.js';

const watchmodeApiKey = process.env.WATCHMODE_API_KEY;
const WATCHMODE_API_URL="https://api.watchmode.com/v1";

/**
 * https://api.watchmode.com/docs/#autocomplete-search
 * Uses 1 API call credit
 * @param {String} query The string query to search with (with spaces as '%20')
 * @param {Number} searchType The type of search to mark the query as
 * @returns The URL of the WatchMode autoComplete query
 */
const getAutoCompleteQueryURL = (query, searchType) => {
    return `${WATCHMODE_API_URL}/autocomplete-search/?apiKey=${watchmodeApiKey}&search_value=${query}&search_type=${searchType}`;
}

/**
 * https://api.watchmode.com/docs/#title
 * Uses 2 API call credits (because we're appending the sources endpoint)
 * The resonse should be used to create documents for the title using Mongoose
 * @param {Number} id The ID of the title to query for
 * @returns The URL of the WatchMode query
 */
const getTitleDetailsQueryURL = (id) => {
    return `${WATCHMODE_API_URL}/title/${id}/details/?apiKey=${watchmodeApiKey}&append_to_response=sources`
}

const fetchTitleById = async (id) => {
    let queryUrl = getTitleDetailsQueryURL(id);
    let res = await fetch(queryUrl);

    if (res.success == false) {
        return null;
    }

    let title = await Title.create({
        watchmodeId: res.id,
        title: res.title,
        plot_overview: res.plot_overview,
        type: res.type,
        runtime_minutes: res.runtime_minutes,
        year: res.year,
        genre_names: res.genre_names,
        user_rating: res.user_rating,
        critic_score: res.critic_score,
        us_rating: res.us_rating,
        poster: res.poster,
        backdrop: res.backdrop,
        similar_titles: res.similar_titles,
        trailer: res.trailer,
        trailer_thumbnail: res.trailer_thumbnail
    });

    let sources = res.sources;
    for (const source of sources) {
        let streamingSource = await StreamingSource.create({
            title: title,
            source_id: source.source_id,
            name: source.name,
            type: source.type,
            region: source.region,
            web_url: source.web_url,
            format: source.format,
            price: source.price,
            seasons: source.seasons,
            episodes: source.episodes,
        });
    }

    return title;
}

export const fetchTitlesByPartialString = async (searchQuery) => {
    let searchType = '2'; // see https://api.watchmode.com/docs/#autocomplete-search
    let queryUrl = getAutoCompleteQueryURL(searchQuery, searchType);
    let res = await fetch(queryUrl);

    if (res.success === false) {
        return null;
    }

    let search_results = [];
    for (const result of res.results) {
        let title_info = {
            name: result.name,
            relevance: result.relevance,
            type: result.type,
            id: result.id,
            year: result.year,
            image_url: result.image_url
        };
        search_results.push(title_info);
    }

    return search_results; // return the results
}

export default { 
    fetchTitleById, 
    fetchTitlesByPartialString
};