export default {
  login(token, cb) {
    if (localStorage.token) {
      this.onChange(token);
      return true;
    }
    localStorage.token = token;
    if (cb) cb(true);
    return true;
  },
  getToken() {
    return localStorage.token;
  },
  logout(cb) {
    delete localStorage.token;
    if (cb) cb(true);
    return true;
  },
  loggedIn() {
    return !!localStorage.token;
  },
  onChange(token) {
    localStorage.token = token;
  },
};
