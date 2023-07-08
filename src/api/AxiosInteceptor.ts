import axios, { AxiosInstance } from "axios";
import { AUTH_TOKEN_KEY } from "../shared/hooks/useAuthToken";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class AxiosInterceptor {
  private axiosInstance: AxiosInstance;

  private static _instance: AxiosInterceptor;

  private constructor() {
    this.axiosInstance = axios.create();

    this.axiosInstance.interceptors.request.use(
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
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  get<T>(...params: Parameters<AxiosInstance["get"]>) {
    return this.axiosInstance.get<T>(...params);
  }

  post<T>(...params: Parameters<AxiosInstance["post"]>) {
    return this.axiosInstance.post<T>(...params);
  }
}
