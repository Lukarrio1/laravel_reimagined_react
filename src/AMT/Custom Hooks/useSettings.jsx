import { useSelector } from "react-redux";
import { getMemSettings } from "../Stores/setting";
/**
 * @description useSettings hook returns getSettings,
  getSettings takes parameters key and return_value,
  return_value can either "value" or "key"
   which are of the requested setting object
   * @returns getSettings()
 */
export default function useSettings() {
  const settings = useSelector((state) => getMemSettings(state));
  return {
    /**
     *
     * @param {string} key
     * @param {string} return_value
     * @returns mixed
     */
    getSetting: (key, return_value = "value") => {
      if (settings[key] == undefined) {
        return null;
      }
      return settings[key][return_value];
    },
  };
}
