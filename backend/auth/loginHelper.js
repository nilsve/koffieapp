import config from '../config';
import jwt from 'jsonwebtoken';

import mongo from '../mongo';

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

export async function register(username, password) {
  const db = await mongo;
  await db.usersCollection.insertOne({
      _id: username,
      username,
      password,
      status  : 'active',
  })

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

async function validateCredentials(username, password) {
  // TODO: Validate
  const db = await mongo;

  const user = await db.usersCollection.findOne({
    _id: username,
    password: password,
  });

  if (user) {
    return true;
  } else {
    return false;
  }
}
