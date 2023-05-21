interface Login {
  readonly error: object;
  readonly errorCode: string;
  readonly isLoginFailed: boolean;
  readonly isLoading: boolean;
  readonly showError: boolean;
  readonly isTokenVerified: boolean;
}

export default Login;
