import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import passport from "passport";
import { engine } from "express-handlebars";

import { connectMongo } from "./db/mongo.js";
import { initializePassport } from "./config/passport.config.js";

// Luego llevarlo a un router
import { passportCall } from './utils/passportCall.js';
import { requireRoles } from "./middlewares/roles.js";
// -- Luego llevarlo a un router



import { apiUsersRouter } from "./routes/api/users.api.js";
import { viewsUsersRouter } from "./routes/views/users.views.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Core middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookies (firmadas)
app.use(cookieParser(process.env.COOKIE_SECRET));

// Static
app.use(express.static("public"));

// Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// Passport
initializePassport({ jwtSecret: process.env.JWT_SECRET });
app.use(passport.initialize());

// Routes
// A Nivel API
app.use("/api/users", apiUsersRouter);
    // Ruta solo para admin 
app.use("/api/secure/admin", passportCall('jwt'), requireRoles(['admin']), (req, res) => {
  res.json({ 
    status: "success",
    message: "Bienvenido Admin",
    user: { email: req.user.email }
});

} )


// A Nivel Navegador Web
app.use("/users", viewsUsersRouter);

// Home (opcional)
app.get("/", (req, res) => res.redirect("/users/login"));






// Boot
await connectMongo(process.env.MONGO_URI);

app.listen(PORT, () => console.log(`[Server] Running on http://localhost:${PORT}`));
