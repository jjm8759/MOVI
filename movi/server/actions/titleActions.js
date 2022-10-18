// I think the only endpoints we'll need are get endpoints.

import exApiActions from "../externalApi/actions.js";
import TitleSource from "../models/titleSource.js";
import Title from "../models/title.js";

// GET request logic - (R)ead in CRUD
// export const getTitles = async (req,res) => {
//     res.send('This is the GET response for the localhost:5000/titles route...');
// }

async function fetchTitleById(id) {
    let title = await Title.findOne({ watchmodeId: id });

    if (title == null) { 
        console.log(`Title with id ${id} not found in database. Fetching from third-party API...`);
        title = await exApiActions.populateTitleById(id);
    }
    if (title == null) return null;

    let sources = await TitleSource.where("title").equals(title._id);
    title = title.toObject();
    title.sources = sources;
    return title;
}

export const getTitleById = async (req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    let title = await fetchTitleById(id);
    if (title == null) return res.status(404).send(`No title with id: ${id}`);
    res.json(title);
}

export const getAutoCompleteSearchResults = async (req,res) => {
    let { search_query, verbose } = req.query;

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

export const getTitleListings = async (req, res) => {
    let { types, source_types, source_ids, genre_ids } = req.query;
    let results = await exApiActions.getListTitlesResults(types, source_types, source_ids, genre_ids)
    
}

// export const postTitles = async (req, res) => {
//     res.send('This is the POST response for the localhost:5000/titles route...');
// }

// export const putTitles = async (req, res) => {
//     res.send('This is the PUT response for the localhost:5000/titles route...');
// }

// export const deleteTitles = async (req, res) => {
//     res.send('This is the DELETE response for the localhost:5000/titles route...');
// }