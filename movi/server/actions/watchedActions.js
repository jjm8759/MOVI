
import Title from '../models/title.js';
import User from '../models/user.js';
import WatchedTitle from '../models/watchedTitle.js';

// GET request logic - (R)ead in CRUD
export const getWatched = async (req, res) => {
    try {
        const watched = await WatchedTitle.find({email:req.body.email});
        return res.status(200).send(watched);
    } catch (err) {
        return res.status(500);
    }
}

/**
 * Generates a watched title using the users email and an ID from the titles database.
 * @param {*} req User email and title id
 * @param {*} res 
 * @returns watched title data
 */
export const postWatched = async (req, res) => {
    try {
        const newWatched = await WatchedTitle.create({
            user: await User.findOne({ email: req.body.email }),
            title: await Title.findOne({ watchmodeId: req.body.watchmodeId }),
        });
        return res.status(200).send(newWatched);

    } catch (err) {
        return res.status(500)
    }


}
/**
 * Deletes singular watched title using it's watchmode id
 * @param {*} req watched title
 * @returns deleted title
 */
export const deleteWatched = async (req, res) => {
    try {
        const watched = await WatchedTitle.findOneAndRemove(req.body.watchmodeId);
        return res.status(200).send(watched);
    } catch (err) {
        return res.status(500);
    }
}