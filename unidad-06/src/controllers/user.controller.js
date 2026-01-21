import userService from "../service/users.service.js"

const getUsers = async ( req, res) => {
    const users = await userService.getAllUsers();
    res.json({
        status: 'succes',
        payload: users
    });
}

const getUserById = async (req, res) => {
    try {
        const { uid } = req.params
        const user = await userService.getById( uid)

        res.json({
            status: 'success',
            payload: user
        })
    } catch (error) {
        console.error({error});
        if(error.message === 'USER_NOT_FOUND'){
            return res.status(404).json({
                status: 'error',
                error:'No se encontro el usuario'
            })
        }

        return res.status(500).json({
                status: 'error',
                error:'Error del servidor'
        })
    }
}

const createUser = async ( req, res) => {
    const data = req.body;
    const newUser =  await userService.createUser( data);
    res.status(201).json(newUser);
}

const deleteById = async (req, res) => {
        try {
        const { uid } = req.params
        await userService.deleteById( uid)

        res.json({
            status: 'success'
        })
    } catch (error) {
        console.error({error});
        if(error.message === 'USER_NOT_FOUND'){
            return res.status(404).json({
                status: 'error',
                error:'No se encontro el usuario'
            })
        }

        return res.status(500).json({
                status: 'error',
                error:'Error del servidor'
        })
    }
}
export default { getUsers, getUserById, deleteById, createUser}