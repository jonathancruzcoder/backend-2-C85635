import passport from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";
import { UserModel } from "../models/user.model.js";

/**
 * Extrae el token desde cookie firmada: currentUser
 * Requiere cookie-parser con secret (app.use(cookieParser(COOKIE_SECRET)))
 */
function cookieExtractor(req) {
  if (!req) return null;
  // signedCookies existe si cookie-parser fue configurado con secret
  const token = req?.signedCookies?.currentUser;
  return token || null;
}

export function initializePassport({ jwtSecret }) {
  const opts = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: jwtSecret
  };

  passport.use(
    "jwt",
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        // jwt_payload recomendado: { user: { id, email, role, ... } }
        const userId = jwt_payload?.user?.id;
        if (!userId) return done(null, false, { message: "Token payload inválido" });

        const user = await UserModel.findById(userId).lean();
        if (!user) return done(null, false, { message: "User not found" });

        // Passport setea req.user con lo que retornes aquí
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  return passport;
}
