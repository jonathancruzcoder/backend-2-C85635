import passport from "passport";

export function passportCall(strategy) {
  return (req, res, next) => {
    passport.authenticate(strategy, { session: false }, (err, user, info) => {
      if (err) {
        return res.status(500).json({ status: "error", error: err.message });
      }

      if (!user) {
        // info viene de passport-jwt: token missing, invalid signature, expired, etc.
        return res.status(401).json({
          status: "error",
          error: "Unauthorized",
          details: info?.message || info || "No token / invalid token"
        });
      }

      req.user = user;
      next();
    })(req, res, next);
  };
}
