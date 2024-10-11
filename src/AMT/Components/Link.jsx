import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import PermissionWrapper from "../Wrappers/PermissionWrapper";
import useVerbiage from "../Custom Hooks/useVerbiage";
import { getMemLinksAndComponents } from "../Stores/coreNodes";

// use text from rest to override the text of the button
export default function Link({
  uuid,
  text = "",
  enable_verbiage = {
    enable: false,
    verbiage_key: "",
    verbiage_properties: {},
    addPrefixOrSuffix: [
      // { variable_name: "", value_to_attach: "", addPrefixOrSuffix: true  //true to prepend, false to append },
    ],
  },
  ...rest
}) {
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
    setNewLink({ ...Actual_link, node_route: linkSeg });
  }, []);

  return newLink?.hasAccess ? (
    <PermissionWrapper
      uuid={uuid}
      children={
        <NavLink to={newLink?.node_route} {...rest}>
          {!text
            ? enable_verbiage?.enable == true
              ? getVerbiage(
                  enable_verbiage?.verbiage_key,
                  enable_verbiage?.verbiage_properties,
                  enable_verbiage?.addPrefixOrSuffix
                )
              : newLink?.name
            : text}
        </NavLink>
      }
    ></PermissionWrapper>
  ) : (
    ""
  );
}
