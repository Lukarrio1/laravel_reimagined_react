import React from "react";
import Navbar from "../Pages/Components/Navbar";
import Footer from "../Pages/Components/Footer";
import SystemErrorMessageBanner from "../AMT/Components/SystemErrorMessageBanner";

export default function UnAuthLayout({ Component, page }) {
  return (
    <div className="container-fluid">
      <Navbar></Navbar>
      <SystemErrorMessageBanner></SystemErrorMessageBanner>
      <div className={"container mt-4"}>{Component}</div>
      <Footer />
    </div>
  );
}
