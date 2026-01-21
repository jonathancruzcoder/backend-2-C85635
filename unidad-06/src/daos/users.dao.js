import { UserModel } from "../models/user.model.js";

export const getAll = async () => UserModel.find().lean();
export const getById = async (id) => UserModel.findById(id).lean();
export const create = async (data) => UserModel.create( data );
export const deleteById = async (id) => UserModel.findOneAndDelete(id);

