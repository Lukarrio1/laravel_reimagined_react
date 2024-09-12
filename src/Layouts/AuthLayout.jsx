import React, { useEffect, useState } from "react";
import Navbar from "../Pages/Components/Navbar";
import Footer from "../Pages/Components/Footer";
import { useSelector } from "react-redux";
import useNavigator from "../Laravel _Reimagined_Library/Custom Hooks/useNavigator";
import useErrors from "../Laravel _Reimagined_Library/Custom Hooks/useErrors";
import useSettings from "../Laravel _Reimagined_Library/Custom Hooks/useSettings";
import useAuthUser from "../Laravel _Reimagined_Library/Custom Hooks/useAuthUser";
import SystemErrorMessageBanner from "../Pages/Components/SystemErrorMessageBanner";

export default function AuthLayout({ Component, page }) {
  const auth_user = useAuthUser();
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
