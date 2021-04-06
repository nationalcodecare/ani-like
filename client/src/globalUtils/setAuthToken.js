import api from './api';

const setAuthToken = token => {
  if (token) {
    api.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('jwt', token);
  } else {
    delete api.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('jwt');
  }
};

export default setAuthToken;