export enum AuthenticationRoutes {
  SIGNIN = "Sign in",
  SIGNUP = "Sign up",
}

export type AuthenticationRouteParamList = {
  [AuthenticationRoutes.SIGNIN]: undefined;
  [AuthenticationRoutes.SIGNUP]: undefined;
};
