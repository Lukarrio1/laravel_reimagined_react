import React, { useCallback, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import useIsRegularReactLinkValid from "../Custom Hooks/useIsRegularReactLinkValid";
import useNavigator from "../Custom Hooks/useNavigator";
import useVerbiage from "../Custom Hooks/useVerbiage";

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

const Link = ({
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
  params = {},
  prefetch = null,
  ...rest
}) => {
  const [newLink, setNewLink] = useState(null);
  const { getVerbiage } = useVerbiage(uuid);
  const queryParamsKeys = Object.keys(queryParams);
  const { setNavProperties } = useNavigator(uuid);
  const navigator = setNavProperties({
    queryParams: queryParams,
    params: params,
  });
  const isRegularLinkValid = useIsRegularReactLinkValid();
  // Callback to handle prefetching when the link is hovered over
  const handlePrefetch = useCallback(
    () => (prefetch === null ? null : prefetch()), // Call prefetch if it is defined
    [prefetch]
  );
  const content = !text
    ? enable_verbiage?.enable === true
      ? getVerbiage(
          enable_verbiage?.verbiage_key, // Retrieve verbiage based on the specified key
          enable_verbiage?.verbiage_properties, // Pass properties for interpolation
          enable_verbiage?.flat_value, // Specify if the return value should be flat
          enable_verbiage?.addPrefixOrSuffix // Pass prefix/suffix settings for interpolation
        )
      : newLink?.name // Fallback to the name from the actual link if no text or verbiage is provided
    : text;

  const NewNavLink = useMemo(
    () => (
      <NavLink
        to={navigator?.node?.node_route} // Set the route for the link using the processed node_route
        {...rest} // Spread any additional props onto the NavLink
        onMouseEnter={handlePrefetch} // Call handlePrefetch on mouse enter to load data
      >
        {/* Determine the text to display based on provided props and verbiage settings */}
        {content}
      </NavLink>
    ),
    [navigator]
  );
  const standard_link =
    isRegularLinkValid == false ? (
      <a href={navigator?.node?.node_route} {...rest}>
        {content}
      </a>
    ) : null;

  // Render the NavLink if the user has access to the link
  return navigator?.node?.hasAccess
    ? isRegularLinkValid
      ? NewNavLink
      : standard_link
    : // Render nothing if the user does not have access to the link
      "";
};
export default Link;
