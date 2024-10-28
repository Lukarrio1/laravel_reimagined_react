import React, { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import PermissionWrapper from "../Wrappers/PermissionWrapper";
import useVerbiage from "../Custom Hooks/useVerbiage";
import { getMemLinksAndComponents } from "../Stores/coreNodes";
import { createQueryString } from "../Abstract/Helpers";

// use text from rest to override the text of the button
const Link = memo(
  ({
    uuid,
    text = "",
    enable_verbiage = {
      enable: false,
      flat_value: true,
      verbiage_key: "",
      verbiage_properties: {},
      addPrefixOrSuffix: [
        // { variable_name: "", value_to_attach: "", addPrefixOrSuffix: true  //true to prepend, false to append },
      ],
    },
    queryParams = {},
    //pass callback function
    prefetch = null,
    ...rest
  }) => {
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
      if (!Actual_link?.node_route) return;
      let linkSeg = Actual_link.node_route.split("/");
      const linkSegValue = {};
      Object.keys(rest)?.forEach((key) => {
        linkSegValue[":" + key] = rest[key];
      });
      linkSeg = linkSeg
        .map((seg) => {
          if (linkSegValue[seg] != null) {
            return linkSegValue[seg];
          }
          return seg;
        })
        .join("/");
      if (queryParamsKeys.length > 0) {
        linkSeg = linkSeg + `?` + createQueryString(queryParams);
      }
      setNewLink({ ...Actual_link, node_route: linkSeg });
    }, []);

    const handlePrefetch = useCallback(
      () => (prefetch != null ? prefetch() : null),
      [prefetch]
    );

    return newLink?.hasAccess ? (
      <NavLink
        to={newLink?.node_route}
        {...rest}
        onMouseEnter={() => handlePrefetch}
      >
        {!text
          ? enable_verbiage?.enable == true
            ? getVerbiage(
                enable_verbiage?.verbiage_key,
                enable_verbiage?.verbiage_properties,
                enable_verbiage?.flat_value,
                enable_verbiage?.addPrefixOrSuffix
              )
            : newLink?.name
          : text}
      </NavLink>
    ) : (
      ""
    );
  }
);

export default Link;
