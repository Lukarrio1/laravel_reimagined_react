import { lazy } from "react";

import UnAuthLayout from "../../Layouts/UnAuthLayout";
import AuthLayout from "../../Layouts/AuthLayout";

const pages = {
  HomePage: lazy(() => import("../../Pages/Home")),
  NotFound: lazy(() => import("../../Pages/NotFound")),
  LoginPage: lazy(() => import("../../Pages/Login")),
  NoPermission: lazy(() => import("../../Pages/NoPermission")),
  RegisterPage: lazy(() => import("../../Pages/Register")),
  EmailVerification: lazy(() => import("../../Pages/EmailVerification")),
};

const layouts = {
  AuthLayout: AuthLayout,
  UnAuthLayout: UnAuthLayout,
};

export { pages, layouts };
