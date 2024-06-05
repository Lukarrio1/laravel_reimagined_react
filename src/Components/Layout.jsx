import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "../Pages/Footer";
import { useSelector } from "react-redux";

export default function Layout({ Component, page }) {
  const { app_version, app_animation } = useSelector((state) => {
    return {
      app_version: state?.setting?.settings?.app_version,
      app_animation: state?.setting?.settings?.app_animation,
    };
  });


  return (
    <>
      <Navbar></Navbar>
      <div className={"container " + app_animation}>{Component}</div>
      <Footer version={app_version} />
    </>
  );
}
