import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMemLinksAndComponents } from "../Stores/coreNodes";
import { createQueryString } from "../Abstract/Helpers";
import { useCallback } from "react";
import useIsRegularReactLinkValid from "./useIsRegularReactLinkValid";

/**
 * @description Custom hook for navigating through the application using a specific UUID.
 * This hook processes links and generates navigation properties based on provided parameters and query parameters.
 * @param {string} UUID - The unique identifier for the link to navigate to.
 * @returns {object} - An object containing a method to set navigation properties and navigate to the constructed link.
 */
export default function useNavigator(UUID) {
  const navigate = useNavigate();

  // Retrieve the link corresponding to the given UUID from the Redux store
  const Actual_link =
    useSelector((state) => {
      return getMemLinksAndComponents(state); // Access the links and components from the Redux store
    }).find((cl) => cl.uuid === UUID) ?? null; // Find the link with the matching UUID or default to null

  /**
   * @description Processes the link by substituting path parameters and appending query parameters.
   * @param {object} params - An object containing path parameters to substitute in the link.
   * @param {object} queryParams - An object containing query parameters to append to the link.
   * @returns {string} - The constructed link with substituted parameters and appended query parameters.
   */
  const processLink = useCallback(
    (params = {}, queryParams = {}) => {
      const queryParamsKeys = Object.keys(queryParams); // Get the keys of query parameters
      let linkSeg =
        Actual_link?.properties?.value?.node_route?.split("/") ?? []; // Split the route into segments

      const linkSegValue = {};

      // Map parameters to their corresponding route segments
      Object.keys(params)?.forEach((key) => {
        linkSegValue[":" + key] = params[key]; // Create a mapping of parameter keys to their values
      });

      // Construct the link segment by replacing parameter placeholders
      linkSeg = linkSeg
        .map((seg) => {
          if (linkSegValue[seg] != undefined) {
            return linkSegValue[seg]; // Replace with parameter value if it exists
          }
          return seg; // Keep the segment as is if no replacement is needed
        })
        .join("/"); // Join the segments back into a string

      // Append query parameters if they exist
      if (queryParamsKeys.length > 0) {
        linkSeg = linkSeg + createQueryString(queryParams); // Add query parameters to the link segment
      }
      return linkSeg; // Return the final constructed link
    },
    [Actual_link] // Dependency for memoization to recalculate if Actual_link changes
  );
  const isRegularLinkValid = useIsRegularReactLinkValid();
  /**
   * @description Sets navigation properties by processing the link with provided parameters.
   * @param {object} options - Options object containing params and queryParams.
   * @param {object} options.params - Path parameters to substitute in the link.
   * @param {object} options.queryParams - Query parameters to append to the link.
   * @returns {object} - An object containing a navigate function and the modified node.
   */
  const setNavProperties = useCallback(
    ({ params = {}, queryParams = {} }) => {
      const linkSeg = processLink(params, queryParams); // Process the link with params and query params
      return {
        navigate: () => {
          if (isRegularLinkValid) {
            navigate(linkSeg);
            return;
          }
          window.location.href = linkSeg;
        }, // Function to navigate to the constructed link
        node: { ...Actual_link, node_route: linkSeg }, // Return the modified node with the new route
      };
    },
    [navigate, Actual_link, isRegularLinkValid] // Dependencies for memoization
  );

  return {
    setNavProperties, // Expose the setNavProperties function
  };
}
