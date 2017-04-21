import Parse from '../../service/parse';

const Q = require('q');

const defer = Q.defer();

const Note = Parse.Object.extend('note');
const types = {
  POST_NOTE: 'POST_NOTE',
  GET_NOTES: 'GET_NOTES',
  GET_NOTE: 'GET_NOTE',
  INIT_NOTE: 'INIT_NOTE',
};

const state = {
  noteCurr: {},
  noteList: [],
};

const getters = {
  noteList: state => state.noteList,
  noteCurr: state => state.noteCurr,
};

const mutations = {
  [types.POST_NOTE](st, note) {
    /* eslint-disable */
    st.noteCurr = note;
    /* eslint-enable */
    const index = st.noteList.findIndex(item => item.objectId === note.objectId);
    if (index > -1) {
      st.noteList.splice(index, 1, note);
    } else {
      st.noteList.push(note);
    }
  },
  [types.GET_NOTES](st, list) {
    let tmpList = list;
    if (!Array.isArray(list)) {
      tmpList = [list.toJSON()];
    }
    tmpList.forEach((note) => {
      /* eslint-disable */
      if (note.toJSON) {
        note = note.toJSON();
      }
      /* eslint-enable */
      const index = st.noteList.findIndex(item => item.objectId === note.objectId);
      if (index > -1) {
        st.noteList.splice(index, 1, note);
      } else {
        st.noteList.push(note);
      }
    });
  },
  [types.GET_NOTE](st, note) {
    /* eslint-disable */
    st.noteCurr = note;
    /* eslint-enable */
  },
  [types.INIT_NOTE](st) {
    /* eslint-disable */
    st.noteCurr = st.noteList[0];
    /* eslint-enable */
  },
};

const actions = {
  /* eslint-disable */
  postNote({ commit }, note) {
    note.tags = note.tags.split(',');
    const newNote = new Note(note);
    return newNote.save(null, {
      success(obj) {
         commit(types.POST_NOTE, obj.toJSON());
      },
    });
  },
  /* eslint-enable */
  getNotes({ commit }) {
    const queryObj = new Parse.Query(Note);
    queryObj.limit(10);
    queryObj.find({
      success: (res) => {
        commit(types.GET_NOTES, res);
      },
    });
  },
  getNote({ commit }, objectId) {
    const queryObj = new Parse.Query(Note);
    queryObj.get(objectId, {
      success: (res) => {
        commit(types.GET_NOTE, res.toJSON());
        defer.resolve(res.toJSON());
      },
    });
    return defer.promise;
  },
  initNote({ commit }) {
    if (state.noteList[0]) {
      commit(types.INIT_NOTE);
      defer.resolve();
      return defer.promise;
    }
    const timer = setInterval(() => {
      if (state.noteList[0]) {
        commit(types.INIT_NOTE);
        clearInterval(timer);
        defer.resolve();
      }
    }, 200);
    return defer.promise;
  },
};

export default { state, getters, mutations, actions };
