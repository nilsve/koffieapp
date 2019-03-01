import config from '../config';
import jwt from 'jsonwebtoken';

// Returnt een signed jwt token
export function login(username, password) {
  // Jsonwebtoken ondertsteunt geen promises helaas, dus geen async functie hiero..
  return new Promise(async (resolve, reject) => {
    // TODO: Verbind met login
    const isValid = await validateCredentials(username, password);

    if (isValid) {
      const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + ((60 * 60) * 12), // Token is 12 uur lang geldig
        data: {
          username,
          role: 'user'
        }
      }, config.secret, (err, token) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(token);
        }
      });
    } else {
      return reject(null);
    }
  });

}

export async function validateJwt(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(decoded);
      }
    });
  })
}

async function validateCredentials(username, password) {
  // TODO: Validate
  if (username === 'test') {
    return true;
  } else {
    return false;
  }
}
