import axios from "axios";

const API = axios.create({
  baseURL: "https://a-medicare-api.vercel.app/api/v1",
  withCredentials: true
});

export default API;
