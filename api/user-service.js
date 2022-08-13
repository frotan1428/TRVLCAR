import axios from "axios";
import { settings } from "../utils/settings";
import { authHeader } from "./auth-header";

const API_URL = settings.apiUrl;

export const login = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

export const register = (user) => {
  return axios.post(`${API_URL}/register`, user);
};

export const getUser = async () => {
  return axios.get(`${API_URL}/user`, { headers: await authHeader() });
};
