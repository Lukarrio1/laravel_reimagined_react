import React, { useEffect, useState } from "react";
import useNavigator from "../Laravel _Reimagined_Library/useNavigator";
import { useSelector } from "react-redux";

export default function Redirect({ children, page }) {
  const { auth_user } = useSelector((state) => {
    return {
      auth_user: state?.authentication?.user,
    };
  });
  const HomePageLink = useNavigator(
    "nQVEMpoZ4cyBICO0iVvi0zBqDIPzN2RWz1ixwSK1ojSOCMZEGG"
  );
  const LoginPageLink = useNavigator(
    "K7rMLEQkQjaUJOOOyXQIbhjssBvPTTpR7MtmLwoFS3TQxXpKLe"
  );
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (auth_user && page?.hasAccess == false) {
        window.location.href = HomePageLink?.node?.node_route;
        return;
      }
      if (!auth_user && page?.hasAccess == false) {
        window.location.href = LoginPageLink?.node?.node_route;
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
              {auth_user ? HomePageLink?.node?.name : LoginPageLink?.node?.name}
            </div>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
}
