import { UserModel } from "../model/user.model.js";

const getAllUsers = async () => {
    const users = await UserModel.find();
    
}

const createUser = () => {

}

export default { getAllUsers, createUser}