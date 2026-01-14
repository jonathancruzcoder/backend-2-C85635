import { Router } from "express";
import { onlyGuests, onlyAuthenticated } from "../../middlewares/authViews.js";
import { passportCall } from "../../utils/passportCall.js";

export const viewsUsersRouter = Router();

viewsUsersRouter.get("/login", onlyGuests, (req, res) => {
  res.render("login", { title: "Login", error: req.query.error });
});

viewsUsersRouter.get("/current", onlyAuthenticated, passportCall("jwt"), (req, res) => {
  // req.user viene de passport (ya validado)
  const safeUser = {
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    email: req.user.email,
    role: req.user.role
  };

  res.render("current", { title: "Current", user: safeUser });
});
