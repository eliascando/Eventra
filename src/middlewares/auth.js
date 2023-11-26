import { decodeToken } from '../services/jwt.js';

const auth = (req, res, next) => {
    
  if (!req.headers.authorization) {
    return res.status(403).json({
      status: 'unauthorized',
      message: 'Missing authorization header',
    });
  }

  let response = decodeToken(req.headers.authorization);

  if (response.code === 401) {
    return res.status(response.code).json({
      status: response.status,
      message: response.message,
    });
  }
  
  next();
};

export { auth };
