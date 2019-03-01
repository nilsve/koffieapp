export function login(username, password) {
  // TODO: Verbind met login
  const isValid = validateCredentials(username, password);

  if (isValid) {

  } else {
    return null;
  }
}

async function validateCredentials(username, password) {
  // TODO: Validate
  return true;
}
