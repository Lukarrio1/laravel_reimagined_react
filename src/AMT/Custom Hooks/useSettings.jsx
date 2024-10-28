import { useSelector } from "react-redux";
import { getMemSettings } from "../Stores/setting";
import { useCallback } from "react";

/**
 * @description The useSettings hook returns a function to retrieve settings.
 * The getSetting function takes a key and an optional return_value,
 * which can be either "value" or "key" to access the requested setting object.
 * @returns {object} An object containing the getSetting function.
 */
export default function useSettings() {
  const settings = useSelector((state) => getMemSettings(state));

  /**
   * @description Retrieves a specific setting based on the provided key.
   * @param {string} key - The key of the setting to retrieve.
   * @param {string} [return_value="value"] - The specific property to return,
   * can be either "value" or "key".
   * @returns {mixed|null} The value of the requested setting property, or null if the key does not exist.
   */
  const getSetting = useCallback(
    (key, return_value = "value") => {
      if (settings[key] === undefined) {
        return null; // Return null if the key does not exist
      }
      return settings[key][return_value]; // Return the requested property of the setting
    },
    [settings] // Dependency array to ensure the function updates if settings change
  );

  return {
    getSetting,
  };
}
