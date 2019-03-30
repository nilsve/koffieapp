import {validateJwt} from './loginHelper';

export const requireLogin = async (req, res, next) => {
  // Ik weet niet of dit de goede manier is.. Maar bij een OPTIONS request sturen we nog geen
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    const jwtToken = req.headers.authorization;
    try {
      const userData = await validateJwt(jwtToken);
      res.locals.userInfo = userData.userInfo;
      next();
    } catch (err) {
      return res.sendStatus(403);
    }
  }
};
