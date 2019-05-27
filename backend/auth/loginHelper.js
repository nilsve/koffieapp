import config from '../config';
import jwt from 'jsonwebtoken';
import mongo from '../mongo';
import {sha256, pbkdf2} from '../routes/auth/secure'

// Returnt een signed jwt token
export function login(username, password) {
  // Jsonwebtoken ondertsteunt geen promises helaas, dus geen async functie hiero..
  return new Promise(async (resolve, reject) => {
    // TODO: Verbind met login
    const isValid = await validateCredentials(username, password);

    if (isValid) {
      const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + ((60 * 60) * 24) * 7 * 4 * 12, // Token is 1 jaar lang geldig
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

  // Salt built with CSPRNG, same length of encrypted password
  const salt = await sha256(require("csprng")(256, 32));

  pbkdf2(salt, password).then((hash) => {
    console.log('hash: ', hash);
    db.usersCollection.createUser(username, hash, salt);
  }).catch((error) => {
    console.log(error)
  })
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
  const db = await mongo;

  const user = await db.usersCollection.getUser(username);

  const hash = await pbkdf2(user.salt, password);
  
  return user && user.password === hash;
}
