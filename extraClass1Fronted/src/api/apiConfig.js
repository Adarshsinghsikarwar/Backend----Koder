import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  method: ["GET"],
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  // params: {
  //   apiKey: "12345",
  // },
  // auth: {
  //   username: "admin",
  //   password: "1234"
  // },
  // responseType: "json",
  validateStatus: function (status) {
    return status < 500;
  },
});
