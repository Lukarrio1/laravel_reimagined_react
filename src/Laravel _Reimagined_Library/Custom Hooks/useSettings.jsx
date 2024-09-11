import React from "react";
import { useSelector } from "react-redux";

/*
  useSettings 
  This returns a function getSettings
  getSettings takes parameters key and return_value
  key, this is the settings key 
  return_value, this is can either "value" or "key"
  which are of the requested setting object 
*/

export default function useSettings() {
  const settings = useSelector((state) => state.setting.settings);
  console.log(settings, "this is the current settings");
  return {
    getSetting: (key, return_value = "value") => {
      if (settings[key] == "undefined") {
        return null;
      }
      return settings[key][return_value];
    },
  };
}
