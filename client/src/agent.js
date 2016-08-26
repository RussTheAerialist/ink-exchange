import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const API_ROOT = 'http://localhost:8000';
const responseBody = res => res.body;
// const encode = encodeURIComponent;

const superagent = superagentPromise(_superagent, global.Promise);

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
};

const request = {
  get: url => superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody)
};

const Inks = {
  all: () => request.get('/inks'),
  get: (id) => request.get(`/inks/${id}`)
};

export default {
  Inks,
  setToken: _token => { token = _token; }
};
