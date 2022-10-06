// GET request logic - (R)ead in CRUD
export const getUsers = (req,res) => {
    res.send('This is the GET response for the localhost:5000/users route...');
}

export const postUsers = (req, res) => {
    res.send('This is the POST response for the localhost:5000/users route...');
}

export const putUsers = (req, res) => {
    res.send('This is the PUT response for the localhost:5000/users route...');
}

export const deleteUsers = (req, res) => {
    res.send('This is the DELETE response for the localhost:5000/users route...');
}