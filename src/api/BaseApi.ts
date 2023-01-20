import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export class BaseApi {
  private api: AxiosInstance;

  public constructor(config: AxiosRequestConfig) {
    this.api = axios.create(config);

    this.api.interceptors.request.use((param: AxiosRequestConfig) => {
      const config = {
        ...param,
        baseURL: process.env.BACKEND_URL, // https://www.npmjs.com/package/dotenv
      };

      // Add stored bearer token to request headers if found
      if (localStorage.getItem("token")) {
        config.headers.Authorization = `Bearer ${localStorage.getItem(
          "token"
        )}`;
      }

      return {
        ...config,
      };
    });

    this.api.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      (error: Error) => {
        return Promise.reject(error);
      }
    );
  }

  // NOTE: Tbh I don't know why they decorated Axios' built in
  // functions below other than to implement dedicated TS types
  public getUri(config?: AxiosRequestConfig): string {
    return this.api.getUri(config);
  }

  public request<T, R = AxiosResponse<T>>(
    config: AxiosRequestConfig
  ): Promise<R> {
    return this.api.request(config);
  }

  public get<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.get(url, config);
  }

  public delete<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.delete(url, config);
  }

  public head<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.head(url, config);
  }

  public post<T, D, R = AxiosResponse<T>>(
    url: string,
    data: D,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.post(url, data, config);
  }

  public put<T, D, R = AxiosResponse<T>>(
    url: string,
    data: D,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.put(url, data, config);
  }

  public patch<T, R = AxiosResponse<T>>(
    url: string,
    data?: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.patch(url, data, config);
  }

  /**
   *
   * @param data Object of params
   * @returns
   */
  public encodeQueryParams(data: object): string {
    return Object.entries(data)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");
  }
}
