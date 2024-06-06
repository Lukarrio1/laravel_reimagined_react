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

  return (
    page && (
      <>
        <Navbar></Navbar>
        <div className={"container " + app_animation}>{Component}</div>
        <Footer version={app_version} />
      </>
    )
  );
}
