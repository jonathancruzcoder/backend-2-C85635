import { Router } from "express";
import { UserModel } from "../../models/user.model.js";
import { hashPassword, comparePassword } from "../../utils/crypto.js";
import { signJwt } from "../../utils/jwt.js";

export const apiUsersRouter = Router();

// CRUD (simple) - /api/users
apiUsersRouter.get("/", async (req, res) => {
  const users = await UserModel.find().select("-password").lean();
  res.json({ status: "success", payload: users });
});

apiUsersRouter.get("/:uid", async (req, res) => {
  const user = await UserModel.findById(req.params.uid).select("-password").lean();
  if (!user) return res.status(404).json({ status: "error", error: "User not found" });
  res.json({ status: "success", payload: user });
});

apiUsersRouter.post("/", async (req, res) => {
  const { first_name, last_name, email, role, password } = req.body;

  const exists = await UserModel.findOne({ email }).lean();
  if (exists) return res.status(409).json({ status: "error", error: "Email already exists" });

  const passwordHash = await hashPassword(password);

  const created = await UserModel.create({
    first_name,
    last_name,
    email,
    role: role || "user",
    password: passwordHash
  });

  res.status(201).json({
    status: "success",
    payload: { id: created._id, email: created.email }
  });
});

apiUsersRouter.put("/:uid", async (req, res) => {
  const updated = await UserModel.findByIdAndUpdate(req.params.uid, req.body, { new: true })
    .select("-password")
    .lean();

  if (!updated) return res.status(404).json({ status: "error", error: "User not found" });
  res.json({ status: "success", payload: updated });
});

apiUsersRouter.delete("/:uid", async (req, res) => {
  const deleted = await UserModel.findByIdAndDelete(req.params.uid).lean();
  if (!deleted) return res.status(404).json({ status: "error", error: "User not found" });
  res.json({ status: "success", payload: { id: deleted._id } });
});

// LOGIN - /api/users/login
apiUsersRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email }).lean();
  if (!user) return res.redirect("/users/login?error=Login%20failed!");

  const ok = await comparePassword(password, user.password);
  if (!ok) return res.redirect("/users/login?error=Login%20failed!");

  const tokenPayload = {
    user: {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      first_name: user.first_name,
      last_name: user.last_name
    }
  };

  const token = signJwt(tokenPayload, process.env.JWT_SECRET, "1h");

  res.cookie("currentUser", token, {
    httpOnly: true,
    signed: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 1000
  });

  return res.redirect("/users/current");
});

// LOGOUT opcional
apiUsersRouter.post("/logout", (req, res) => {
  res.clearCookie("currentUser");
  res.redirect("/users/login");
});
