import axios from "axios";

export const getApiNinjaBaseInstance = () => {
  const instance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_NINJA_URL,
    timeout: 8000, // Set a timeout value in milliseconds
    headers: {
      // set default headers for all requests
      "Content-Type": "application/json",
      "X-Api-Key": process.env.EXPO_PUBLIC_NINJA_KEY,
    },
  });
  return instance;
};
