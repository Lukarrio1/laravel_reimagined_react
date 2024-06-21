import React, { useEffect, useState } from "react";
import useNavigator from "../Custom Hooks/useNavigator";
import { useSelector } from "react-redux";
import useVerbiage from "../Custom Hooks/useVerbiage";

export default function RedirectWrapper({ children, page }) {
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
        window.location.href = redirect_to_after_login?.value;
        return;
      }
      if (!auth_user && page?.hasAccess == false) {
        window.location.href = redirect_to_after_logout?.value;
        return;
      }
    }, 1100);
    return () => clearTimeout(timeout);
  }, [page]);

  const { getVerbiage } = useVerbiage(
    "255ZjmZxTG8xHe3PRQc7BRVTqQTW1Tc9JXHOSvPkNGQPIPD4CT"
  );

  return (
    <>
      {page?.hasAccess == false ? (
        <div className="row">
          <div className="col-sm-6 offset-sm-3 h4 mt-5 text-center">
            <div class="alert alert-warning" role="alert">
              {getVerbiage("on_redirect_message", {
                url: auth_user
                  ? redirect_to_after_login?.key
                  : redirect_to_after_logout?.key,
              })}
            </div>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
}
