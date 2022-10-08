/**
 * This file contains implementation of an interface for 
 * interacting with external movie database APIs.
 * 
 * For now, the only external API is WatchMode. Files outside
 * of this folder should not perform queries of external APIs.
 */
import axios from 'axios';
import StreamingSource from '../models/streamingSource.js';
import Title from '../models/title.js';
import { getAutoCompleteQueryURL, getTitleDetailsQueryURL } from './watchMode.js';

/**
 * Performs a GET http operation on a query URL
 * @returns The response in JSON format
 */
const fetch = async (url) => axios.get(url)
.then((response) => { return response.data })
.catch((error) => console.error(error));

/**
 * This function queries watchmode for a title with the specified WatchMode ID.
 * It then constructs a Titles collection document for the title, and constructs
 * a StreamingSources collection document for each streaming source the title is
 * available on.
 * @param {Number} id The id of the title to fetch
 * @returns The newly created database document for the title or null
 */
export const fetchTitleById = async (id) => {
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
    for (let i = 0; i < sources.length; i++) {
        let source = sources[i];

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

/**
 * This function queries WatchMode for titles whose names match
 * the provided string. 
 * @param {String} title_string
 * @returns The results from the WatchMode API (should be standardized later)
 */
 export const fetchTitlesByPartialString = async (title_string) => {
    let searchType = '2'; // see https://api.watchmode.com/docs/#autocomplete-search
    query = title_string.replace(" ", "%20"); // replace spaces with %20
    let queryUrl = getAutoCompleteQueryURL(query, searchType);
    let res = fetch(queryUrl);

    if (res.success === false) {
        return null;
    }

    return res.results;
}