import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tpbackendunip.herokuapp.com/api/',
});
export default api;
