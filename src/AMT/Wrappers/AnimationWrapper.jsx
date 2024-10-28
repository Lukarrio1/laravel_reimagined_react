import React, { memo, useMemo } from "react";
import useSettings from "../Custom Hooks/useSettings";

/**
 * A wrapper component that applies an animation class to its children based on application settings.
 *
 * @component
 * @param {Object} props - The props for the AnimationWrapper component.
 * @param {React.ReactNode} props.children - The children elements to be wrapped with the animation class.
 *
 * @returns {JSX.Element} A div element containing the children wrapped with the animation class.
 */
const AnimationWrapper = memo(({ children }) => {
  const { getSetting } = useSettings();

  // Memoize the animation class based on the setting for "app_animation"
  // This prevents recalculating the animation class unless the getSetting function changes
  const animationClass = useMemo(
    () => getSetting("app_animation") || "", // Retrieve the animation class; default to an empty string if not set
    [getSetting]
  );

  // Render a div with the determined animation class and the children elements
  return <div className={animationClass}>{children}</div>;
});

export default AnimationWrapper;
