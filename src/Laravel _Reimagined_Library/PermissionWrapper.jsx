import React, { useEffect, useState } from "react";
import NoPermission from "../Pages/NoPermission"; // Adjust the path as needed
import { useSelector } from "react-redux";

const PermissionWrapper = ({ uuid, children }) => {
  const [hasPermission, setHasPermission] = useState(true);
  const [currentLinkOrComponent, setCurrentLinkOrComponent] = useState(null);
  const { componentOrLink, authUser, authPermissions } = useSelector(
    (state) => {
      const temp = [...state?.authentication.permissions.map((p) => p.id), 0];
      const currentNode = [
        ...state?.coreNodes.links,
        ...state?.coreNodes.components,
      ]?.filter((cl) => cl.uuid == uuid)[0]?.permission_id;
      return {
        componentOrLink: temp.includes(currentNode),
        authPermissions: state?.authentication.permissions ?? [],
        authUser: state?.authentication.user,
      };
    }
  );

  return componentOrLink ? children : <></>;
};

export default PermissionWrapper;
