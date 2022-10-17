/**
 * This file contains implementation of an interface for 
 * interacting with external movie database APIs.
 * 
 * For now, the only external API is WatchMode. Files outside
 * of this folder should not perform queries of external APIs.
 */

import watchMode from './watchMode.js';

/**
 * Populates a Titles collection document for the title, and populates
 * the StreamingSources collection document for each streaming source 
 * the title is available on.
 * @param {Number} id The id of the title to fetch
 * @returns The newly created database document for the title or null (invalid id)
 */
export const populateTitleById = async (id) => {
    return await watchMode.fetchTitleById(id);
}

/**
 * This function queries WatchMode for titles whose names contain
 * the provided substring.
 * @param {String} search_query The string query to search with
 * @returns a list of search result objects
 */
 export const searchTitlesByPartialString = async (search_query) => {
    return await watchMode.fetchTitlesByPartialString(search_query);
}

/**
 * Updates the genre and providers (streaming sources) config collections
 * using Watchmode endpoints. These collections provide a map of names to IDs.
 */
export const updateDatabaseConfig = async () => {
    await watchMode.updateGenres();
    await watchMode.updateProviders();
    console.log("Database config updated.")
}