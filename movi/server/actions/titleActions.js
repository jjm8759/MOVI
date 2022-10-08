// I think the only endpoints we'll need are get endpoints.

import { fetchTitleById } from "../externalApi/actions.js";
import StreamingSource from "../models/streamingSource.js";
import Title from "../models/title.js";

// GET request logic - (R)ead in CRUD
// export const getTitles = async (req,res) => {
//     res.send('This is the GET response for the localhost:5000/titles route...');
// }

export const getAutoCompleteSearchResults = async (req,res) => {
    // 
}

export const getTitleById = async (req, res) => {
    let { id } = req.params;
    let title = await Title.findOne({ watchmodeId: id });

    if (title == null) { 
        console.log(`Title with id ${id} not found in database. Fetching from third-party API...`)
        title = await fetchTitleById(id);
    }
    if (title == null) return res.status(404).send(`No title with id: ${id}`);

    let sources = await StreamingSource.where("title").equals(title._id);
    title = title.toObject();
    title.sources = sources;
    res.json(title);
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