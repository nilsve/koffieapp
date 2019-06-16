import {validateJwt} from './loginHelper';

export const requireLogin = async (req, res, next) => {
  const jwtToken = req.headers.authorization;
  try {
    const userData = await validateJwt(jwtToken);
    res.locals.userInfo = userData.data;
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
};

export const requireAdmin = async (req, res, next) => {
  if (res.locals.userInfo.isAdmin) {
    next();
  } else {
    return res.sendStatus(403);
  }
}
