import { AxiosRequestConfig } from "axios";

export const apiConfig: AxiosRequestConfig = {
  timeout: Math.round(2 * 60 * 1000),
  baseURL: process.env.BACKEND_URL, // https://www.npmjs.com/package/dotenv
  headers: {
    common: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  },
};
