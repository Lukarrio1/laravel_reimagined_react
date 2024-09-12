import React from "react";
import Navbar from "../Pages/Components/Navbar";
import Footer from "../Pages/Components/Footer";
import SystemErrorMessageBanner from "../Pages/Components/SystemErrorMessageBanner";
import useSettings from "../Laravel _Reimagined_Library/Custom Hooks/useSettings";

export default function UnAuthLayout({ Component, page }) {
  const { getSetting } = useSettings();
  return (
    page && (
      <>
        <Navbar></Navbar>
        <SystemErrorMessageBanner></SystemErrorMessageBanner>
        <div className={"container"}>{Component}</div>
        <Footer version={getSetting("app_version")} />
      </>
    )
  );
}
