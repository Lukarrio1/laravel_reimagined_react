import { useSelector } from "react-redux";
/**
 * @description useSettings hook returns getSettings,
  getSettings takes parameters key and return_value,
  return_value can either "value" or "key"
   which are of the requested setting object
   * @returns getSettings()
 */
export default function useSettings() {
  const settings = useSelector((state) => state.setting.settings);
  return {
    /**
     *
     * @param {string} key
     * @param {string} return_value
     * @returns string|boolean|array|object
     */
    getSetting: (key, return_value = "value") => {
      if (settings[key] == "undefined") {
        return null;
      }
      return settings[key][return_value];
    },
  };
}
