import * as userDao from '../daos/users.dao.js'

const getAllUsers = async () => userDao.getAll();
const getById = async (id) => {
    const user = await userDao.getById(id);
    if( !user) throw new Error("USER_NOT_FOUND");
    return user
}

const deleteById = async (id) => {
    const user = await userDao.deleteById(id);
    if( !user) throw new Error("USER_NOT_FOUND");
    return user
}

const createUser = async (data) => {
    const user = await userDao.create( data);
}

export default { getAllUsers, getById, deleteById, createUser}