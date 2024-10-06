import React, { useEffect, useState } from "react";
import useNavigator from "../Custom Hooks/useNavigator";
import { useSelector } from "react-redux";
import useVerbiage from "../Custom Hooks/useVerbiage";
import { useNavigate } from "react-router-dom";
import useSettings from "../Custom Hooks/useSettings";
import useAuthUser from "../Custom Hooks/useAuthUser";
/**
 *
 *@description This handles the redirecting of user if they are not logged
  in or lack the required permission to view the requested page
 */
export default function RedirectWrapper({ children, page }) {
  const { getSetting } = useSettings();
  const auth_user = useAuthUser();
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (auth_user && page?.hasAccess == false) {
        navigate(getSetting("redirect_to_after_login"));
        return;
      }
      if (!auth_user && page?.hasAccess == false) {
        navigate(getSetting("redirect_to_after_logout"));
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
                  ? getSetting("redirect_to_after_login", "key")
                  : getSetting("redirect_to_after_logout", "key"),
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
