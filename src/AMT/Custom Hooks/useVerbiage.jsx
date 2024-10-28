import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { getLinksPagesLayoutsAndComponents } from "../Stores/coreNodes";

/**
 *@description This hook is used to get the verbiage associated
 * with an item found by comparing the given UUID with the item's UUID.
 * @param {string} uuid - The UUID of the item to retrieve verbiage for.
 * @returns {Object} getVerbiage() - A function to retrieve interpolated verbiage.
 */
export default function useVerbiage(uuid) {
  // Retrieve the verbiage associated with the provided UUID from the Redux store
  const PageVerbiage =
    useSelector((state) => getLinksPagesLayoutsAndComponents(state))?.find(
      (item) => item?.uuid == uuid
    )?.verbiage ?? {}; // Fallback to an empty object if not found

  /**
   * @description Updates the value of a variable based on provided prefix/suffix rules.
   * @param {string} variable_name - The name of the variable to update.
   * @param {string} variable_value - The current value of the variable.
   * @param {Array} addPrefixOrSuffix - An array of prefix/suffix configuration objects.
   * @returns {string} - The updated variable value with prefix/suffix if applicable.
   */
  const updateValues = useCallback(
    (variable_name, variable_value, addPrefixOrSuffix = []) => {
      // Find the configuration for the given variable name
      const variable_to_update = addPrefixOrSuffix?.filter(
        (item) => item?.variable_name == variable_name
      )[0];
      // If no configuration is found, return the original variable value
      return variable_to_update == null
        ? variable_value
        : variable_to_update?.addPrefixOrSuffix === true
        ? `${variable_to_update?.value_to_attach}${variable_value}` // Prepend the value
        : `${variable_value}${variable_to_update?.value_to_attach}`; // Append the value
    },
    []
  );

  /**
   * @description Retrieves verbiage based on a key and interpolates it using provided properties.
   * @param {string} key - The key for the verbiage to retrieve.
   * @param {object} properties - An object containing data for interpolation (e.g., { name: 'foo' }).
   * @param {boolean} flat_value - If true, return plain text; otherwise, return HTML.
   * @param {array} addPrefixOrSuffix - Configuration for adding prefix/suffix to variables.
   * @returns {JSX.Element|string} - The interpolated content or an empty string if not found.
   */
  const getVerbiage = useCallback(
    (
      key,
      properties = {},
      flat_value = false,
      addPrefixOrSuffix = [
        // Example configuration for prefix/suffix: { variable_name: "", value_to_attach: "", addPrefixOrSuffix: true }
      ]
    ) => {
      // Split the verbiage content into words and process each word
      const content = PageVerbiage[key]
        ?.split(" ")
        .map((item) => {
          // Check if the item contains a variable placeholder
          if (item.split("{-").length > 1) {
            // Extract the variable name and surrounding text
            const variable = item
              .split("{-")
              .filter((new_item) => new_item.length > 0)[0]
              ?.split("-}")
              .filter((new_item) => new_item.length > 0)[0];

            const middle_seg = item
              .split("{-")
              .filter((new_item) => new_item.length > 0)[1]
              ?.split("-}")[0];

            const first_seg =
              middle_seg == undefined
                ? ""
                : item
                    .split("{-")
                    .filter((new_item) => new_item.length > 0)[0] ?? "";

            const last_seg =
              middle_seg == undefined
                ? ""
                : item
                    .split("{-")
                    .filter((new_item) => new_item.length > 0)[1]
                    ?.split("-}")[1] ?? "";

            // Check if the property for the variable is defined and interpolate it
            return properties[
              middle_seg != undefined ? middle_seg : variable
            ] != undefined
              ? `${first_seg}${updateValues(
                  middle_seg != undefined ? middle_seg : variable,
                  properties[middle_seg != undefined ? middle_seg : variable] ??
                    "",
                  addPrefixOrSuffix
                )}${last_seg}`
              : ""; // Return an empty string if no property is found
          }
          return item;
        })
        .join(" ");

      // Return the processed content based on whether the key is found
      return PageVerbiage[key] != undefined && PageVerbiage[key] != null ? (
        flat_value === true ? (
          content // Return plain text if flat_value is true
        ) : (
          <span
            dangerouslySetInnerHTML={{
              __html: content, // Set the content as HTML
            }}
          ></span>
        )
      ) : (
        "" // Return an empty string if the key is not found
      );
    },
    [PageVerbiage] // Dependency array for the useCallback hook
  );

  return {
    /**
     * @description getVerbiage is used to get a specific piece of content given key and properties,
     * properties is the data that should be interpolated in the content e.g. properties={name:'foo'}
     * content="Hello {name}" results in "Hello foo".
     * @param {string} key - The key of the content to retrieve.
     * @param {object} properties - The properties to interpolate into the content.
     * @param {bool} flat_value - Whether to return plain text or HTML.
     * @param {array} addPrefixOrSuffix - Configuration for prefix/suffix.
     * @returns {JSX.Element|string} - The interpolated content or an empty string.
     */
    getVerbiage,
  };
}
