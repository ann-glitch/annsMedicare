import axios from "axios";

const API = axios.create({
  baseURL: "https://anns-medicare-api.vercel.app/api/v1",
  withCredentials: true
});

export default API;
