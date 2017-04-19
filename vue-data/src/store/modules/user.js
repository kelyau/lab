import auth from '../../service/auth';
import Parse from '../../service/parse';

const types = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  SIGNUP: 'SIGNUP',
};

const state = {
  user: {},
  token: '',
};

const getters = {
  loggedIn: state => !!state.token,
};
/* eslint-disable */
const mutations = {
  [types.SIGNUP](state, obj) {
    state.user = obj;
    state.token = obj.sessionToken;
    
  },
  [types.LOGIN](state, obj) {
    state.user = obj;
    state.token = obj.sessionToken;
  },
  [types.LOGOUT](state) {
    state.user = {};
    state.token = '';
  }
};
/* eslint-enable */
const actions = {
  signup({ commit }, user) {
    const newUser = new Parse.User(user);
    return newUser.signUp(null, {
      success: (u) => {
        commit('SIGNUP', u.toJSON());
        auth.login(u.toJSON().sessionToken);
      },
      error: (u, error) => {
        /* eslint-disable */
        console.log(u, error);
        /* eslint-enable */
      },
    });
  },
  initUser({ commit }) {
    const token = auth.getToken();
    return Parse.User.become(token)
      .then((user) => {
        commit('SIGNUP', user.toJSON());
        auth.login(user.toJSON().sessionToken);
        return user;
      }, error => error);
  },
  login({ commit }, user) {
    return Parse.User.logIn(user.username, user.password)
      .then((u) => {
        commit('LOGIN', u.toJSON());
        auth.login(u.toJSON().sessionToken);
      }, (error) => {
        /* eslint-disable */
        console.log(error);
        /* eslint-enable */
      },
      );
  },
  logout({ commit }) {
    commit('LOGOUT');
    auth.logout();
    return Parse.User.logOut();
  },
};

export default { state, getters, mutations, actions };
