export function onlyGuests(req, res, next) {
  // si tiene cookie firmada currentUser, consideramos "logueado"
  if (req?.signedCookies?.currentUser) {
    return res.redirect("/users/current");
  }
  next();
}

export function onlyAuthenticated(req, res, next) {
  if (!req?.signedCookies?.currentUser) {
    return res.redirect("/users/login?error=Login%20required");
  }
  next();
}
