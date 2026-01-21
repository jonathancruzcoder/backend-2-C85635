import userService from "../service/user.service.js"

const getUsers = ( req, res) => {
    const users = userService.getAllUsers();
    res.json( users);
}


const createUser = ( req, res) => {
    const newUser = req.body;
    userService.createUser( newUser);
    res.status(201).json(newUser);
}

export default { getUsers, createUser}