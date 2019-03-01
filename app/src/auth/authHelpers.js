let cachedUserData = null; // Caching

export function loadUserData() {
  if (!cachedUserData) {
    cachedUserData = JSON.parse(window.localStorage.getItem('userData'));
  }

  return cachedUserData;
}

export function storeUserData(userData) {
  window.localStorage.setItem('userData', JSON.stringify(userData));
  cachedUserData = userData;
}
