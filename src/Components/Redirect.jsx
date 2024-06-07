import React, { useEffect, useState } from "react";
import useNavigator from "../Laravel _Reimagined_Library/useNavigator";
import { useSelector } from "react-redux";

export default function Redirect({ children, page }) {
  const { auth_user, redirect_to_after_login, redirect_to_after_logout } =
    useSelector((state) => {
      return {
        auth_user: state?.authentication?.user,
        redirect_to_after_login:
          state?.setting?.settings?.redirect_to_after_login,
        redirect_to_after_logout:
          state?.setting?.settings?.redirect_to_after_logout,
      };
    });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (auth_user && page?.hasAccess == false) {
        window.location.href = redirect_to_after_login;
        return;
      }
      if (!auth_user && page?.hasAccess == false) {
        window.location.href = redirect_to_after_logout;
        return;
      }
    }, 1500);
    return () => clearTimeout(timeout);
  }, [page]);

  return (
    <>
      {page?.hasAccess == false ? (
        <div className="row">
          <div className="col-sm-6 offset-sm-3 h4 mt-5 text-center">
            <div class="alert alert-warning" role="alert">
              Access denied redirecting to{"  "}
              {auth_user ? redirect_to_after_login : redirect_to_after_logout}
            </div>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
}
