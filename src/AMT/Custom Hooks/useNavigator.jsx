import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/**
 * @description This hook is used to programmatically navigate through the app
 * it handles adding params to route(link) and permission cases of the route(link)
 * @param {string} UUID
 * @returns setProperties(), node
 */
const useNavigator = (UUID) => {
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);
  const [rest, setProperties] = useState({});
  const { Actual_link } = useSelector((state) => {
    let temp = true;
    const currentNode = [
      ...state?.coreNodes.links,
      ...state?.coreNodes.components,
    ]?.filter((cl) => cl.uuid == UUID)[0];

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
    if (isReady == false) return;
    let linkSeg = Actual_link?.node_route?.split("/") ?? [];
    console.log(Actual_link, rest);
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
  }, [isReady]);

  useEffect(() => {
    if (!newLink?.name) return;
    navigate(newLink?.node_route);
  }, [newLink]);

  return {
    /**
     *@description this function sets the properties of the link that was given
     and the is ready state if navigating is being done programmatically
     * @param {object} param
     */
    setNavProperties: ({ ready, ...next }) => {
      setProperties(next);
      setIsReady(ready);
    },
    node: Actual_link,
  };
};

export default useNavigator;
