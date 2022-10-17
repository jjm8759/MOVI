import Genre from "../models/config/genre.js";
import Provider from "../models/config/provider.js";

// get a map of genres names and ids
export const getGenres = async (req,res) => {
    let genres = await Genre.find({});
    genres = genres.map(genre => ({
        id: genre.id,
        name: genre.name 
    }));
    res.json(genres);
}

// Get a list of all supported providers and their metadata
export const getProviders = async (req,res) => {
    let providers = await Provider.find({});
    providers = providers.map(provider => ({
        id: provider.id,
        name: provider.name,
        type: provider.type,
        logo_100px: provider.logo_100px,
        regions: provider.regions
    }));
    res.json(providers);
}
