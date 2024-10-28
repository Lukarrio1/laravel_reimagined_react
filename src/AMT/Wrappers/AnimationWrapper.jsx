import React, { memo } from "react";
import useSettings from "../Custom Hooks/useSettings";
/**
 *@description this is used to apply an animation to a page or component
 */
const AnimationWrapper = memo(({ children }) => {
  const { getSetting } = useSettings();
  return <div className={getSetting("app_animation")}>{children}</div>;
});

export default AnimationWrapper;
