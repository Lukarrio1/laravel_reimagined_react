import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import PermissionWrapper from "./PermissionWrapper";

// use text from rest to override the text of the button
export default function Link({ uuid, text = "", ...rest }) {
  const { Actual_link } = useSelector((state) => {
    let temp = true;
    const currentNode = [
      ...state?.coreNodes.links,
      ...state?.coreNodes.components,
    ]?.filter((cl) => cl.uuid == uuid)[0];

    if (!currentNode) {
      return { Actual_link: {} };
    }

    if (
      state?.authentication.user != null &&
      currentNode?.authentication_level?.value == 0
    )
      temp = false;
    console.log(
      {
        name: currentNode?.name,
        hasAccess: temp,
        ...currentNode?.properties?.value,
      },
      "this is the current node"
    );
    return {
      Actual_link: {
        name: currentNode?.name,
        hasAccess: temp,
        ...currentNode?.properties?.value,
      },
    };
  });

  const [newLink, setNewLink] = useState(null);

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
          {!text ? newLink?.name : text}
        </NavLink>
      }
    ></PermissionWrapper>
  ) : (
    ""
  );
}
