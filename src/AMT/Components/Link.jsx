import React, { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import useVerbiage from "../Custom Hooks/useVerbiage";
import { getMemLinksAndComponents } from "../Stores/coreNodes";
import { createQueryString } from "../Abstract/Helpers";

/**
 * A memoized Link component that renders a navigation link with optional verbiage and query parameters.
 *
 * @component
 * @param {Object} props - The props for the Link component.
 * @param {string} props.uuid - The unique identifier for the link to retrieve from the store.
 * @param {string} [props.text=""] - Optional text for the link; overrides verbiage if provided.
 * @param {Object} [props.enable_verbiage] - Configuration for enabling and customizing verbiage.
 * @param {boolean} [props.enable_verbiage.enable=false] - Flag to enable retrieval of verbiage.
 * @param {boolean} [props.enable_verbiage.flat_value=true] - If true, returns plain text; if false, returns HTML formatted text.
 * @param {string} [props.enable_verbiage.verbiage_key=""] - The key used to fetch specific verbiage from the verbiage object.
 * @param {Object} [props.enable_verbiage.verbiage_properties={}] - Properties used for interpolating values into the verbiage string.
 * @param {Array} [props.enable_verbiage.addPrefixOrSuffix=[]] - Configuration for adding prefix/suffix to interpolated values.
 * @param {Object} [props.queryParams={}] - An object containing any query parameters to append to the link URL.
 * @param {function|null} [props.prefetch=null] - Optional callback function for prefetching data related to the link.
 * @param {...Object} rest - Additional props to be passed to the NavLink component.
 *
 * @returns {JSX.Element|null} A NavLink element if the user has access; otherwise, null.
 */
const Link = memo(
  ({
    uuid,
    text = "",
    enable_verbiage = {
      enable: false,
      flat_value: true,
      verbiage_key: "",
      verbiage_properties: {},
      addPrefixOrSuffix: [],
    },
    queryParams = {},
    prefetch = null,
    ...rest
  }) => {
    // Select the actual link object from the Redux store based on the provided UUID
    const Actual_link = useSelector((state) => getMemLinksAndComponents(state))
      ?.map((currentNode) => {
        return {
          uuid: currentNode?.uuid,
          name: currentNode?.name,
          hasAccess: currentNode?.hasAccess,
          ...currentNode?.properties?.value,
        };
      })
      ?.find((cl) => cl.uuid == uuid);

    const [newLink, setNewLink] = useState(null);
    const { getVerbiage } = useVerbiage(uuid);
    const queryParamsKeys = Object.keys(queryParams);

    useEffect(() => {
      if (!Actual_link?.node_route) return; // Exit early if the node route is not defined
      let linkSeg = Actual_link.node_route.split("/"); // Split the route into segments for processing
      const linkSegValue = {};

      // Prepare the route segments for any dynamic values passed via props
      Object.keys(rest)?.forEach((key) => {
        linkSegValue[":" + key] = rest[key]; // Map dynamic props to their respective route segments
      });
      linkSeg = linkSeg
        .map((seg) => {
          // Replace route segments with their corresponding values if available
          if (linkSegValue[seg] != null) {
            return linkSegValue[seg]; // Replace the segment with the value if it exists
          }
          return seg; // Keep the segment unchanged if no value is found
        })
        .join("/"); // Reassemble the segments back into a single route string

      // Append query parameters to the link if any exist
      if (queryParamsKeys.length > 0) {
        linkSeg = linkSeg + `?` + createQueryString(queryParams); // Create and append the query string
      }

      // Update the state with the new link object containing the processed route
      setNewLink({ ...Actual_link, node_route: linkSeg });
    }, []);

    // Callback to handle prefetching when the link is hovered over
    const handlePrefetch = useCallback(
      () => (prefetch != null ? prefetch() : null), // Call prefetch if it is defined
      [prefetch]
    );

    // Render the NavLink if the user has access to the link
    return newLink?.hasAccess ? (
      <NavLink
        to={newLink?.node_route} // Set the route for the link using the processed node_route
        {...rest} // Spread any additional props onto the NavLink
        onMouseEnter={handlePrefetch} // Call handlePrefetch on mouse enter to load data
      >
        {/* Determine the text to display based on provided props and verbiage settings */}
        {!text
          ? enable_verbiage?.enable === true
            ? getVerbiage(
                enable_verbiage?.verbiage_key, // Retrieve verbiage based on the specified key
                enable_verbiage?.verbiage_properties, // Pass properties for interpolation
                enable_verbiage?.flat_value, // Specify if the return value should be flat
                enable_verbiage?.addPrefixOrSuffix // Pass prefix/suffix settings for interpolation
              )
            : newLink?.name // Fallback to the name from the actual link if no text or verbiage is provided
          : text}{" "}
      </NavLink>
    ) : (
      // Render nothing if the user does not have access to the link
      ""
    );
  }
);

export default Link;
