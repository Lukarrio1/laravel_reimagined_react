import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  }, [isReady]);

  useEffect(() => {
    if (!newLink) return;
    if (!Actual_link?.hasAccess) return;
    navigate(newLink?.node_route);
  }, [newLink]);

  return {
    setNavProperties: ({ ready, ...next }) => {
      setProperties(next);
      setIsReady(ready);
    },
  };
};

export default useNavigator;
