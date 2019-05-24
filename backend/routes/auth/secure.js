import {rejects} from "assert";

export const sha256 = async (content) => {
  const crypto = require("crypto")

  try {
    const hash = crypto.createHash("sha256")
      .update(content)
      .digest("hex")
    return hash
  } catch (error) {
    console.log(error)
  }
}

export const pbkdf2 = async (salt, password) => {
  return new Promise((resolve, reject) => {
    const crypto = require("crypto");
    crypto.pbkdf2(password, salt, 1000, 64, 'sha256', (err, derivedKey) => {
      if (err) {
        reject(err);
      } else {
        resolve(derivedKey.toString('hex'))
      }
    });
  });
}
