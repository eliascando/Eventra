import jwt from 'jwt-simple';
import moment from 'moment';
import { config } from '../../config.js';

const createToken = (user) => {
    const payload = {
        username: user.username,
        email: user.email,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(1, 'day').unix(),
    };

    return jwt.encode(payload, config.JWT_SECRET);
}

const decodeToken = (token) => {
    let tkn =token.replace(/['"]+/g, '');

    try{
        var payload = jwt.decode(tkn, config.JWT_SECRET);
        if (payload.exp <= moment().unix()) {
            return {
                code: 401,
                key: 'ex',
                status: 'unauthorized',
                message: 'Expired token',
            };
        }else if(payload.exp > moment().unix() && payload.email){
            return {
                code: 200,
                key: 'ok',
                status: 'authorized',
                message: 'Valid token',
            };
        }
    }catch(err){
        return {
            code: 401,
            key: 'in',
            status: 'unauthorized',
            message: 'Invalid token',
        };
    }
}

export { createToken, decodeToken };
