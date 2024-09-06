import React from "react";
import { useSelector } from "react-redux";
import useSettings from "../Custom Hooks/useSettings";

export default function AnimationWrapper({ children }) {
  const {getSetting} = useSettings()
  return <div className={getSetting('app_animation')}>{children}</div>;
}
