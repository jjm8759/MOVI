import exApiActions from "../externalApi/actions.js";
import WatchedTitle from '../models/watchedTitle.js';
import RecommendedTitle from '../models/recommendedTitle.js';
import User from '../models/user.js';
import { fetchTitleById } from "./titleActions.js";
import Title from "../models/title.js";

// This is the GET response for the localhost:5000/recommended route
export const getRecommended = async (req,res) => {
    let { userEmail } = req.params;
    let user = await User.findOne({userEmail: userEmail});
    let numRecommendations = 10; // user should have 10 recommended titles (hardcoded test value for now)
    let recommendedTitles = await RecommendedTitle.find({user: user._id});

    // If the user already has enough recommendations generated, send them in the response
    if (recommendedTitles.length >= numRecommendations) {
        recommendedTitles = await Promise.all(recommendedTitles.map(async (recommended) => {
            return await Title.findById(recommended.title);
        }));

         res.status(200).json(recommendedTitles);
         return;
    }
 
    // if the user doesn't have enough recommendations, generate the remainder
    numRecommendations -= recommendedTitles.length;

    // check if the user has more than ~10 watched titles
    // If there aren't enough watched titles, good recommendations can't be generated

    let watched = await WatchedTitle.find({userEmail: userEmail });
    if (watched.length < 10) {
         res.status(204).json("Not enough watched titles for recommendations...");
         return;
    }

    // Otherwise, get recommendations by mapping occurance
    // overlaps in titles similar to watched titles

    // ### get a list of all titles similar to watched titles ###
    
    // First, process a flat list of all title ids similar to titles the user has watched
    let similars_all = [];
    for(let watchedTitle of watched){
        let title = await Title.findById(watchedTitle.title);

        similars_all.push(title.similar_titles);
    }
    similars_all = similars_all.flat();

    let idCountMap = {}; // Next, initialize an empty id count map (just an object).
    // Increment the count of each id in the occurence list
    similars_all.forEach((id) => {
        if (idCountMap[id] === undefined) {
            idCountMap[id] = 1;
        } 
        else idCountMap[id]++;
    });
    // create an array of unique title ids
    let similars_unique = [... new Set(similars_all)];
    
    // remove titles that have already been watched by the user
    // and titles that have already been recommended
    similars_unique = similars_unique.filter(async (id) => {
        let title = await Title.findOne({watchmodeId: id});
        if (title == null) return false;
        return await WatchedTitle.find({title: title._id, user: user._id}) == null &&
               await RecommendedTitle.find({title: title._id, user: user._id}) == null;
    });
    // Sort the unique array by descending number of occurances in the map, and grab the top n
    similars_unique = similars_unique.sort(id => 1/idCountMap[id]).slice(0, numRecommendations);

    let titles = await Promise.all(similars_unique.map(async (id) => {
        return await fetchTitleById(id);
    }));

    // Populate RecommendedTitle database collection
    titles.forEach(async (title) => {
        RecommendedTitle.create({
            user: user,
            title: title
        });
    });

    // Re-fetch all recommended titles to send
    recommendedTitles = await RecommendedTitle.find({user: user});
    recommendedTitles = await Promise.all(recommendedTitles.map(async (recommended) => {
        return await Title.findById(recommended.title);
    }));
    recommendedTitles = recommendedTitles.slice(0, numRecommendations);
    return res.status(200).send(recommendedTitles);
}