// I think the only endpoints we'll need are get endpoints.

import exApiActions from "../externalApi/actions.js";
import TitleSource from "../models/titleSource.js";
import Title from "../models/title.js";

/**
 * Fetches and returns the title with the passed ID, or null if ID is invalid
 * @param {Number} id The ID of the title to fetch
 * @returns The title object with the matching ID, along with list of sources
 */
async function fetchTitleById(id) {
    // check database for a matching title ID
    let title = await Title.findOne({ watchmodeId: id });

    // If one wasn't found, populate from external APIs
    if (title == null) { 
        console.log(`Title with id ${id} not found in database. Fetching from third-party API...`);
        title = await exApiActions.populateTitleById(id);
    }
    // If the ID still wasn't found, return null
    if (title == null) return null;

    // Append the sources list to the returned object
    let sources = await TitleSource.where("title").equals(title._id);
    title = title.toObject();
    title.sources = sources;
    return title;
}

/**
 * Handles an HTTP get request for a title with the path-variable-parameterized ID.
 * Example query: localhost:5000/title/:id, where :id is the title ID 
 *                localhost:5000/title/37764
 * @param req HTTP request
 * @param res HTTP response
 * @returns JSON containing the object with sources or null for invalid request
 */
export const getTitleById = async (req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    let title = await fetchTitleById(id);
    if (title == null) return res.status(404).send(`No title with id: ${id}`);
    res.json(title);
}

/**
 * Handles an HTTP get request for titles whose name contains the 
 * query-parameterized substring.
 * Example query: localhost:5000/title/search/?search_query=harry%20potter
 * 
 * Additional query params:
 *      verbose: should be true or false
 *      WARNING: verbose will populate the database for each title in the
 *               results and return a populated list. Functions similarly
 *               to if you did a separate ID query for each result.
 *               USE WITH CAUTION, this eats up API credits like crazy.
 * 
 * @param req HTTP request
 * @param res HTTP response: JSON containing the list query results.
 */
export const getAutoCompleteSearchResults = async (req,res) => {
    let { search_query, verbose } = req.query;

    // ... check remaining external API usage
    // If out of credit, search internally...
    // otherwise do the following:

    let results = await exApiActions.searchTitlesByPartialString(search_query);

    if (results == null) res.status(404).send(`No search results from query: ${search_query}`);

    if (verbose === 'false') {
        return res.json(results);
    }

    let titles = [];
    for (var result of results) {
        let title = await fetchTitleById(result.id);
        console.log(title);
        titles.push(title);
    }
    res.json(titles);
}

/**
 * Returns a list of titles filtered by the provided query parameters. Does not
 * support a parameter to search by title string/substring (blame Watchmode).
 * 
 * The following query parameters are supported:
 * - types (optional)
 *      Filter result to only include certain types of titles. Pass a single 
 *      type or pass multiple types comma delimited. Possible values: movie, 
 *      tv_series, tv_special, tv_miniseries, short_film
 * 
 * - source_types (optional)
 *      Filter results to only include titles that are available on a specific
 *      type(s) of source (such a subscription, or TV Everywhere channel apps,
 *      etc). By default all are selected, pass one or multiple (comma 
 *      delimited) of these values: sub, rent, buy, free, tve
 * 
 * - source_ids (optional)
 *      Pass an individual ID for a source (returned from the
 *      /config/providers/ endpoint) to filter the results to titles available
 *      on that source. Pass multiple values comma separated to return titles
 *      available on one of the sources you pass in.
 * 
 * - genres (optional)
 *      Filter results to only include certain genre(s). Pass in a single genre
 *      id (which you would get from the /config/genres/ endpoint, or multiple 
 *      comma separated.
 * 
 * - sort_by (optional)
 *      Sort order of results, possible values: relevance_desc, relevance_asc, 
 *      popularity_desc, popularity_asc, release_date_desc, release_date_asc, 
 *      title_desc, title_asc. Default value is: relevance_desc.
 * @param req The HTTP request
 * @param res The HTTP response: JSON containing the list of query results.
 */
export const getTitleListings = async (req, res) => {
    let { types, source_types, source_ids, genre_ids, sort_by } = req.query;
    let results = await exApiActions.getListTitlesResults(types, source_types, source_ids, genre_ids, sort_by);
    res.json(results);
}