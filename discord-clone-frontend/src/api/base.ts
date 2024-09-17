import axios from "axios";
import { store } from "../redux/store";
import { setTokens, clearUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = "http://localhost:5198";

export const server = axios.create({
  baseURL: API_BASE_URL,
});

server.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const accessToken = state.user.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

server.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const user = store.getState().user;
        const resposne = await axios.post("api/auth/refresh-token", {
          refreshToken: user.refreshToken,
          userId: user.id,
          accessToken: user.accessToken,
        });
        const data = resposne.data;
        store.dispatch(setTokens(data));

        return server(originalRequest);
      } catch (refreshError) {
        store.dispatch(clearUser());
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
