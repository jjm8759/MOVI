// GET request logic - (R)ead in CRUD
export const getWatched = async (req,res) => {
    res.send('This is the GET response for the localhost:5000/watched route...');
}

export const postWatched = async (req, res) => {
    res.send('This is the POST response for the localhost:5000/watched route...');
}

export const putWatched = async (req, res) => {
    res.send('This is the PUT response for the localhost:5000/watched route...');
}

export const deleteWatched = async (req, res) => {
    res.send('This is the DELETE response for the localhost:5000/watched route...');
}

//User needs to be able to remove a watched title
//MANDATORY 
///GET (Return the list of watched titles for user, takes in a user)
//PUT (Adds a new title to the list of watched titles)
//DELETE (Removes title from the users watched list)