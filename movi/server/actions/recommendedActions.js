import exApiActions from "../externalApi/actions.js";
import WatchedTitle from '../models/watchedTitle.js';
import RecommendedTitle from '../models/recommendedTitle.js';
import { fetchTitleById } from "./titleActions";

// GET request logic - (R)ead in CRUD
export const getRecommended = async (req,res) => {
    //res.send('This is the GET response for the localhost:5000/recommended route...');
    let { userEmail } = req.params;

    const numRecommendations = 8;

    // If !shouldRegenerateRecommendedTitles
    let recommended = RecommendedTitle.find({userEmail: userEmail});

    // check if the user has more than ~10 watched titles
    let watched = await WatchedTitle.find({userEmail: userEmail });
    if (watched.length() < 10) {
        res.status(204).json("Not enough watched titles for recommendations...");
        return;
    }
    // if not, do a simpler recommendation based on popular movies 
    // or popular movies that fall under the user's favorite genres
    // Otherwise, get recommendation via similar titles occurance count method

    // ### get a list of all titles similar to watched titles ###
    let idCountMap = {}; // First, initialize an empty id count object.

    // Next, process a flat list of all title ids similar to titles the user has watched
    let similars_all = watched.map(async (watched) => {
        return await watched.populate("title").title.similar_titles;
    }).flat();

    // Increment the count of each id in the occurence list
    similars_all.forEach((id) => {
        if (idCountMap[id] === undefined) {
            idCountMap[id] = 1;
        } 
        else idCountMap[id]++;
    });

    let similars_unique = [...Set(similars_all)];
    similars_unique.sort(id => idCountMap[id]).slice(0, numRecommendations);

    similars_unique.map(async (id) => {
        let title = await fetchTitleById(id);
    });

    res.status(200).json(similars_unique);
}