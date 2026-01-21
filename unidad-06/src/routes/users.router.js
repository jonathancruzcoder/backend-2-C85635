import { Router } from "express";
import userController from '../controllers/user.controller.js'
// Provisorio ...
import { UserModel } from "../models/user.model.js";


import { hashPassword, comparePassword } from "../utils/crypto.js";
import { getById } from "../daos/users.dao.js";

const router = Router()

router.get('/', userController.getUsers);
router.get('/uid', getById);
router.delete('/:uid', userController.deleteById);

// Anteriormente sin las capas Controller, Service, Dao
router.post('/', async (req, res) => {
  const { name, email, role, password } = req.body;

  const exists = await UserModel.findOne({ email }).lean();
  if (exists) return res.status(409).json({ status: "error", error: "El email ya está registrado" });

  const passwordHash = await hashPassword(password);

  const created = await UserModel.create({
    name,
    email,
    role: role || "user",
    password: passwordHash
  });

  res.status(201).json({
    status: "success",
    payload: { id: created._id, email: created.email }
  });

});



export default router