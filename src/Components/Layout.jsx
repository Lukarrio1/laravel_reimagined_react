import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "../Pages/Footer";
import { useSelector } from "react-redux";
import useNavigator from "../Laravel _Reimagined_Library/useNavigator";

export default function Layout({ Component, page }) {
  const { app_version, app_animation, auth_user } = useSelector((state) => {
    return {
      app_version: state?.setting?.settings?.app_version,
      app_animation: state?.setting?.settings?.app_animation,
      auth_user: state?.authentication?.user,
    };
  });
  const [isReady, setIsReady] = useState(false);
  const HomePageLink = useNavigator(
    "nQVEMpoZ4cyBICO0iVvi0zBqDIPzN2RWz1ixwSK1ojSOCMZEGG"
  );
  const LoginPageLink = useNavigator(
    "K7rMLEQkQjaUJOOOyXQIbhjssBvPTTpR7MtmLwoFS3TQxXpKLe"
  );

  useEffect(() => {
    if (auth_user && page?.hasAccess == false) {
      window.location.href = HomePageLink?.node?.node_route;
      return;
    }

    if (!auth_user && page?.hasAccess == false) {
      window.location.href = LoginPageLink?.node?.node_route;
      return;
    }
    setIsReady(true);
  }, [page]);

  return (
    page && (
      <>
        <Navbar></Navbar>
        <div className={"container " + app_animation}>
          {isReady == false ? "" : Component}
        </div>
        <Footer version={app_version} />
      </>
    )
  );
}
