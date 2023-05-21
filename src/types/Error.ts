export interface Error {
  code: string;
  message: string;
}

export interface AxiosError<T> {
  response: {
    data: T;
  };
}
