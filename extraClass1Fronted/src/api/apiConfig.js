import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  method: ["GET"],
  headers: {
    "Content-Type": "application/json",
  },
});
