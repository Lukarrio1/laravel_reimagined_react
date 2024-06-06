import React, { useEffect } from "react";
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

  const HomePageLink = useNavigator(
    "nQVEMpoZ4cyBICO0iVvi0zBqDIPzN2RWz1ixwSK1ojSOCMZEGG"
  );
  const LoginPageLink = useNavigator(
    "K7rMLEQkQjaUJOOOyXQIbhjssBvPTTpR7MtmLwoFS3TQxXpKLe"
  );

  useEffect(() => {
    if (page?.isAuthenticated == 0 && auth_user) {
      HomePageLink.setNavProperties({ ready: true });
    }

    if (page?.isAuthenticated == 1 && !auth_user) {
      LoginPageLink.setNavProperties({ ready: true });
    }
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className={"container " + app_animation}>{Component}</div>
      <Footer version={app_version} />
    </>
  );
}
