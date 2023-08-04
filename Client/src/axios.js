// import axios from "axios";
// export const makeRequest = axios.create({
//   baseURL: "http://localhost:4000/api/",
//   withCredentials: true,
// });
// export const makeRequestAuth = axios.create({
//     baseURL: "http://localhost:4000/",
//     withCredentials: true,
//   });


import axios from "axios";
export const makeRequest = axios.create({
  baseURL: "http://52.62.206.125:4000/api/",
  withCredentials: true,
});
export const makeRequestAuth = axios.create({
    baseURL: "http://52.62.206.125:4000/",
    withCredentials: true,
  });


