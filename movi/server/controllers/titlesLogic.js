// GET request logic - (R)ead in CRUD
export const getTitles = async (req,res) => {
    res.send('This is the GET response for the localhost:5000/titles route...');
}

export const postTitles = async (req, res) => {
    res.send('This is the POST response for the localhost:5000/titles route...');
}

export const putTitles = async (req, res) => {
    res.send('This is the PUT response for the localhost:5000/titles route...');
}

export const deleteTitles = async (req, res) => {
    res.send('This is the DELETE response for the localhost:5000/titles route...');
}