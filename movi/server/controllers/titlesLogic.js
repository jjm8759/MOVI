// GET request logic - (R)ead in CRUD
export const getTitles = (req,res) => {
    res.send('This is the GET response for the localhost:5000/titles route...');
}

export const postTitles = (req, res) => {
    res.send('This is the POST response for the localhost:5000/titles route...');
}

export const putTitles = (req, res) => {
    res.send('This is the PUT response for the localhost:5000/titles route...');
}

export const deleteTitles = (req, res) => {
    res.send('This is the DELETE response for the localhost:5000/titles route...');
}