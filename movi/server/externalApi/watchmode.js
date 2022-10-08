import dotenv from 'dotenv';
dotenv.config();

const watchmodeApiKey = process.env.WATCHMODE_API_KEY;
const WATCHMODE_API_URL="https://api.watchmode.com/v1";

/**
 * https://api.watchmode.com/docs/#autocomplete-search
 * Uses 1 API call credit
 * @param {String} query The string query to search with (with spaces as '%20')
 * @param {Number} searchType The type of search to mark the query as
 * @returns The URL of the WatchMode autoComplete query
 */
export const getAutoCompleteQueryURL = (query, searchType) => {
    return `${WATCHMODE_API_URL}/search/?apiKey=${watchmodeApiKey}&search_value=${query}&search_type=${searchType}`;
}

/**
 * https://api.watchmode.com/docs/#title
 * Uses 2 API call credits (because we're appending the sources endpoint)
 * The resonse should be used to create documents for the title using Mongoose
 * @param {Number} id The ID of the title to query for
 * @returns The URL of the WatchMode query
 */
export const getTitleDetailsQueryURL = (id) => {
    return `${WATCHMODE_API_URL}/title/${id}/details/?apiKey=${watchmodeApiKey}&append_to_response=sources`
}