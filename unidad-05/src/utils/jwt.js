import jwt from 'jsonwebtoken';

const JWTSCRET = 'MiClaveSecreta';

export const generateToken = ( user) => {
    return jwt.sign(user, JWTSCRET, { expiresIn: '1h'});
}

export const verifyToken = ( token) => {
    return jwt.verify( token, JWTSCRET);
}