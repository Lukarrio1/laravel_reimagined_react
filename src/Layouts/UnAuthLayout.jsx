import React from "react";
import Navbar from "../Pages/Components/Navbar";
import Footer from "../Pages/Components/Footer";
import SystemErrorMessageBanner from "../Pages/Components/SystemErrorMessageBanner";

export default function UnAuthLayout({ Component, page }) {
  return (
    page && (
      <>
        <Navbar></Navbar>
        <SystemErrorMessageBanner></SystemErrorMessageBanner>
        <div className={"container"}>{Component}</div>
        <Footer />
      </>
    )
  );
}
