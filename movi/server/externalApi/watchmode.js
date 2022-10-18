import dotenv from 'dotenv';
import fetch from './fetch.js';
dotenv.config();

import TitleSource from '../models/titleSource.js';
import Title from '../models/title.js';
import Genre from '../models/config/genre.js';
import Provider from '../models/config/provider.js';

const watchmodeApiKey = process.env.WATCHMODE_API_KEY;
const watchmodeUrl="https://api.watchmode.com/v1";

const getQuotaUsagePercent = async () => {
    let url = `${watchmodeUrl}/status/?apiKey=${watchmodeApiKey}`;
    let { quota, quotaUsed } = await fetch(url);
    let usage = (quotaUsed / quota) * 100;
    console.log(`WATCHMODE API: You have used ${usage}% of your quota.`);
    return usage;
}

/**
 * https://api.watchmode.com/docs/#title
 * Uses 2 API call credits (because we're appending the sources endpoint)
 * The resonse should be used to create documents for the title using Mongoose
 * @param {Number} id The ID of the title to query for
 * @returns The URL of the WatchMode query
 */
const getTitleDetailsQueryURL = (id) => {
    return `${watchmodeUrl}/title/${id}/details/?apiKey=${watchmodeApiKey}&append_to_response=sources`
}

/**
 * https://api.watchmode.com/docs/#autocomplete-search
 * Uses 1 API call credit
 * @param {String} query The string query to search with (with spaces as '%20')
 * @param {Number} searchType The type of search to mark the query as
 * @returns The URL of the WatchMode autoComplete query
 */
const getAutoCompleteQueryURL = (query, searchType) => {
    return `${watchmodeUrl}/autocomplete-search/?apiKey=${watchmodeApiKey}&search_value=${query}&search_type=${searchType}`;
}

const getTitleListingsURL = (types, source_types, source_ids, genre_ids) => {
    let url = `${watchmodeUrl}/list-titles/?apiKey=${watchmodeApiKey}&limit=20`;
    
    if (types != undefined) url.concat(`&types=${types}`);
    if (source_types!= undefined) url.concat(`&source_types=${source_types}`);
    if (source_ids != undefined) url.concat(`&source_ids=${source_ids}`);
    if (genre_ids!= undefined) url.concat(`&genre_ids=${genre_ids}`);

    return url;
}

async function createTitle(title_data) {
    let title = await Title.create({
        watchmodeId: title_data.id,
        title: title_data.title,
        plot_overview: title_data.plot_overview,
        type: title_data.type,
        runtime_minutes: title_data.runtime_minutes,
        year: title_data.year,
        genre_names: title_data.genre_names,
        user_rating: title_data.user_rating,
        critic_score: title_data.critic_score,
        us_rating: title_data.us_rating,
        poster: title_data.poster,
        backdrop: title_data.backdrop,
        similar_titles: title_data.similar_titles,
        trailer: title_data.trailer,
        trailer_thumbnail: title_data.trailer_thumbnail
    });

    return title;
}

async function createSource(source, title) {
    let provider = await Provider.findOne({id: source.source_id})
    await TitleSource.create({
        title: title,
        provider: provider,
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

const fetchTitleById = async (id) => {
    let queryUrl = getTitleDetailsQueryURL(id);
    let res = await fetch(queryUrl);
    getQuotaUsagePercent();

    if (res.success == false) {
        return null;
    }

    let title = await createTitle(res);
    
    let sources = res.sources;
    let sourcesPromises = sources.map(source => createSource(source, title));
    await Promise.all(sourcesPromises)

    return title;
}

export const fetchTitlesByPartialString = async (searchQuery) => {
    let searchType = '2'; // see https://api.watchmode.com/docs/#autocomplete-search
    let queryUrl = getAutoCompleteQueryURL(searchQuery, searchType);
    let res = await fetch(queryUrl);
    getQuotaUsagePercent();

    if (res.success === false) {
        return null;
    }

    let search_results = [];
    for (const result of res.results) {
        let title_info = {
            title: result.name,
            relevance: result.relevance,
            id: result.id,
            year: result.year,
            type: result.type,
            image_url: result.image_url
        };
        search_results.push(title_info);
    }

    return search_results; // return the results
}

export const fetchTitleListings = async (types, source_types, source_ids, genre_ids) => {
    let url = getTitleListingsURL(types, source_types, source_ids, genre_ids);

    let res = await fetch(url);
    getQuotaUsagePercent();

    if (res.success === false) {
        return null;
    }

    let search_results = [];
    for (const result of res.titles) {
        let title_info = {
            title: result.title,
            id: result.id,
            year: result.year,
            type: result.type,
        };
        search_results.push(title_info);
    }

    return search_results; // return the results
}

const updateGenres = async () => {
    let url = `${watchmodeUrl}/genres/?apiKey=${watchmodeApiKey}`;
    let res = await fetch(url);

    await Genre.deleteMany({});
    for (const genre of res) {
        await Genre.create({
            id: genre.id,
            name: genre.name,
        });
    }
}

const updateProviders = async () => {
    let url = `${watchmodeUrl}/sources/?apiKey=${watchmodeApiKey}`;
    let res = await fetch(url);

    await Provider.deleteMany({});
    for (const provider of res) {
        await Provider.create({
            id: provider.id,
            name: provider.name,
            type: provider.type,
            logo_100px: provider.logo_100px,
            regions: provider.regions
        });
    }
}

export default { 
    getQuotaUsagePercent,
    fetchTitleById, 
    fetchTitlesByPartialString,
    fetchTitleListings,
    updateGenres,
    updateProviders,
};