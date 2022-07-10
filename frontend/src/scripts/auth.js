/**
 * This represents some generic auth provider API, like Firebase.
 */
const internalAuthProvider = {
  isAuthenticated: false,
  signin(callback) {
    internalAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  signout(callback) {
    internalAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

export { internalAuthProvider };
