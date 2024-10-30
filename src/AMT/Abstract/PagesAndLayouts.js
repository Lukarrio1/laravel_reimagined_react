import { lazy } from "react";

import UnAuthLayout from "../../Layouts/UnAuthLayout";
import AuthLayout from "../../Layouts/AuthLayout";

const pages = {
  HomePage: lazy(() => import("../../Pages/Home")),
  NotFound: lazy(() => import("../../Pages/NotFound")),
  LoginPage: lazy(() => import("../../Pages/Auth/Login")),
  NoPermission: lazy(() => import("../../Pages/NoPermission")),
  RegisterPage: lazy(() => import("../../Pages/Auth/Register")),
  EmailVerification: lazy(() => import("../../Pages/EmailVerification")),
  PasswordResetEmail: lazy(() => import("../../Pages/Auth/PasswordResetEmail")),
  PasswordReset: lazy(() => import("../../Pages/Auth/PasswordReset")),
};

const layouts = {
  AuthLayout: AuthLayout,
  UnAuthLayout: UnAuthLayout,
};

export { pages, layouts };
