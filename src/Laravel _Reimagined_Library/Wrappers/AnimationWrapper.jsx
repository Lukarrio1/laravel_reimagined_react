import React from "react";
import useSettings from "../Custom Hooks/useSettings";
/**
 *@description this is used to apply an animation to a page or component
 */
export default function AnimationWrapper({ children }) {
  const { getSetting } = useSettings();
  return <div className={getSetting("app_animation")}>{children}</div>;
}
