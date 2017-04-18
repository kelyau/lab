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
    state.user = {
      username: obj.get('username'),
      email: obj.get('email'),
    };
    state.token = obj.get('sessionToken');
    auth.login(obj.get('sessionToken'));
  },
  [types.LOGIN](state, obj) {
    state.user = {
      username: obj.get('username'),
      email: obj.get('email')
    };
    state.token = obj.get('sessionToken');
    auth.login(obj.get('sessionToken'));
  },
  [types.LOGOUT](state) {
    state.user = {};
    state.token = '';
    auth.logout();
  }
};
/* eslint-enable */
const actions = {
  signup({ commit }, user) {
    const newUser = new Parse.User();
    newUser.set('username', user.username);
    newUser.set('password', user.password);
    newUser.set('email', user.email);
    return newUser.signUp(null, {
      success: (u) => {
        commit('SIGNUP', u);
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
        commit('SIGNUP', user);
        return user;
      }, error => error);
  },
  login({ commit }, user) {
    return Parse.User.logIn(user.username, user.password)
      .then((u) => {
        commit('LOGIN', u);
      }, (error) => {
        /* eslint-disable */
        console.log(error);
        /* eslint-enable */
      },
      );
  },
  logout({ commit }) {
    commit('LOGOUT');
    return Parse.User.logOut();
  },
};

export default { state, getters, mutations, actions };
