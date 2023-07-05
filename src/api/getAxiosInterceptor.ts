import axios from "axios";
import { AUTH_TOKEN_KEY } from "../shared/hooks/useAuthToken";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAxiosInterceptor = async () => {
  const axiosInstance = axios.create();

  axiosInstance.interceptors.request.use(
    async (config) => {
      const authToken = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
