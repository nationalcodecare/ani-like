import axios from 'axios';

let baseURL;
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://127.0.0.1:5000/api/v1';
} else {
  baseURL = '/api/v1';
}

export default axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
