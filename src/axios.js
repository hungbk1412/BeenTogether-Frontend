import axios from 'axios';

export default axios.create({
  baseURL: "https://beentogether.herokuapp.com",
  withCredentials: true
})