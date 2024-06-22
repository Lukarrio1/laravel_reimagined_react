import React from "react";
import { useSelector } from "react-redux";

export default function AnimationWrapper({ children }) {
  const { app_animation } = useSelector((state) => {
    return {
      app_animation: state?.setting?.settings?.app_animation?.value,
    };
  });
  return <div className={app_animation}>{children}</div>;
}
