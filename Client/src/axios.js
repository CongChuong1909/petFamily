import axios from "axios";
export const makeRequest = axios.create({
//   baseURL: "http://localhost:4000/",
  baseURL: "https://api.petfamily.click/api/",
  withCredentials: true,
});
export const makeRequestAuth = axios.create({
    // baseURL: "http://localhost:4000/",
    baseURL: "https://auth.petfamily.click/",
    withCredentials: true,
  });

