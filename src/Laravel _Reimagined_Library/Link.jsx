import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import PermissionWrapper from "./PermissionWrapper";

export default function Link({ uuid, ...rest }) {
  const { Actual_link, hasAccess } = useSelector((state) => {
    let temp = true;
    const currentNode = [
      ...state?.coreNodes.links,
      ...state?.coreNodes.components,
    ]?.filter((cl) => cl.uuid == uuid)[0];

    if (!currentNode) temp = false;
    if (
      state?.authentication.user != null &&
      currentNode?.authentication_level?.value == 0
    )
      temp = false;

    return {
      Actual_link: {
        name: currentNode?.name,
        hasAccess: temp,
        ...currentNode?.properties?.value,
      },
      authPermissions: state?.authentication.permissions ?? [],
      authUser: state?.authentication.user,
    };
  });

  const [newLink, setNewLink] = useState(null);

  useEffect(() => {
    if (!Actual_link) return;
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

  return newLink ? (
    <PermissionWrapper
      uuid={uuid}
      children={
        <NavLink to={newLink?.node_route} {...rest}>
          {newLink?.name}
        </NavLink>
      }
    ></PermissionWrapper>
  ) : (
    ""
  );
}
