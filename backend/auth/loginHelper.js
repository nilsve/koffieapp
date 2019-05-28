import config from '../config';
import jwt from 'jsonwebtoken';

import mongo from '../mongo';

// Returnt een signed jwt token
export function login(username, password) {
  // Jsonwebtoken ondertsteunt geen promises helaas, dus geen async functie hiero..
  return new Promise(async (resolve, reject) => {
    // TODO: Verbind met login
    const user = await getUser(username, password);

    if (user) {
      const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + ((60 * 60) * 24) * 7 * 4 * 12, // Token is 1 jaar lang geldig
        data: {
          username,
          isAdmin: user.isAdmin,
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

export async function register(username, password) {
  const db = await mongo;

  await db.usersCollection.createUser(username, password);
  return true;
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

async function getUser(username, password) {
  const db = await mongo;

  const user = await db.usersCollection.getUser(username);

  if (user && user.password === password) {
    return user;
  } else {
    return false;
  }
}
