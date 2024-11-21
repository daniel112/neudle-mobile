import axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance } from "axios";

export interface ApiResponse<T> {
  success: boolean;
  /**
   * The response body of the API
   */
  body?: T;
  /**
   * The error message if the request fails
   */
  message?: string;
  status?: number;
}

/**
 * @description Creates an HTTP service instance with default Alchemy headers and timeout
 * @param baseInstance base axios instance. If not provided, a new instance will be created
 * @param baseURL The base URL of the API
 * @example
 * const httpService = createHttpService(process.env.EXPO_PUBLIC_NINJA_URL)
 * const result = await httpService.get<Array<AlchemyFeedback>>('/feedback', { ...AxiosParams })
 */
export const createHttpService = (
  baseInstance: AxiosInstance | null = null,
  baseURL = "https://localhost:7209/v2",
) => {
  const instance =
    baseInstance ??
    axios.create({
      baseURL,
      timeout: 8000, // Set a timeout value in milliseconds
      headers: {
        // set default headers for all requests
        "Content-Type": "application/json",
      },
    });

  /**
   * @description Wrapper for axios.get with error handling
   * @param path - The path of the API endpoint. Example: '/feedback'
   * @param config
   * @returns {ApiResponse<T>} ApiResponse object
   */
  const get = async <T>(
    path: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> => {
    try {
      const response: AxiosResponse<T> = await instance.get(path, config);
      const isSuccessCode = response.status >= 200 && response.status < 300;
      return {
        success: isSuccessCode,
        body: response.data,
        status: response.status,
      };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          message: error.message,
          status: error.response?.status,
        };
      } else {
        // Something happened in setting up the request that triggered an Error
        return {
          success: false,
          message: "Internal Server Error",
          status: 500,
        };
      }
    }
  };

  /**
   * @description Wrapper for axios.post with error handling
   * @param path - The path of the API endpoint. Example: '/feedback'
   * @param data - The data to be sent in the request body
   * @param config
   * @returns {ApiResponse<R>} ApiResponse object - {data:R, message:string}
   */
  const post = async <R = boolean>(
    path: string,
    data?: object,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<R>> => {
    try {
      const response: AxiosResponse<R> = await instance.post(
        path,
        data,
        config,
      );
      const isSuccessCode = response.status >= 200 && response.status < 300;
      return {
        success: isSuccessCode,
        body: response.data,
      };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return { success: false, message: error.message };
      } else {
        // Something happened in setting up the request that triggered an Error
        return { success: false, message: "Internal Server Error" };
      }
    }
  };

  /**
   * @description Wrapper for axios.put with error handling
   * @param path - The path of the API endpoint. Example: '/feedback'
   * @param data - The data to be sent in the request body
   * @param config
   * @returns {ApiResponse<R>} ApiResponse object - {data:R, message:string}
   */
  const put = async <R = boolean>(
    path: string,
    data?: object,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<R>> => {
    try {
      const response: AxiosResponse<R> = await instance.put(path, data, config);
      const isSuccessCode = response.status >= 200 && response.status < 300;
      return {
        success: isSuccessCode,
        body: response.data,
      };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return { success: false, message: error.message };
      } else {
        // Something happened in setting up the request that triggered an Error
        return { success: false, message: "Internal Server Error" };
      }
    }
  };
  return {
    get,
    post,
    put,
  };
};
