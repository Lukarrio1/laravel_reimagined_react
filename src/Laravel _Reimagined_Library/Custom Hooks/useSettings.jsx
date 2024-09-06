import React from "react";
import { useSelector } from "react-redux";

export default function useSettings() {
  const settings = useSelector((state) => state.setting.settings);
  console.log(settings, "this is the current settings");
  return {
    getSetting: (key) => {
      const temp = {};
      if (settings[key] == "undefined") {
        temp[key] = "";
        return "";
      }
      return settings[key]?.value;
    },
  };
}
