import React, { memo } from "react";
import Navbar from "../Pages/Components/Navbar";
import Footer from "../Pages/Components/Footer";
import SystemMessageBanner from "../AMT/Components/SystemMessageBanner";

const UnAuthLayout = memo(({ Component, page }) => {
  return (
    <div className="container-fluid">
      <Navbar></Navbar>
      <SystemMessageBanner></SystemMessageBanner>
      <div className={"container mt-4"}>{Component}</div>
      <Footer />
    </div>
  );
});

export default UnAuthLayout;
