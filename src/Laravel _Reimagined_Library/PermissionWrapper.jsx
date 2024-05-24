import { useSelector } from "react-redux";

const PermissionWrapper = ({ uuid, children }) => {
  const { componentOrLink } = useSelector((state) => {
    const temp = [...state?.authentication.permissions.map((p) => p.id), 0];
    const currentNode = [
      ...state?.coreNodes.links,
      ...state?.coreNodes.components,
    ]?.filter((cl) => cl.uuid == uuid)[0]?.permission_id;
    return {
      componentOrLink: temp.includes(currentNode),
    };
  });

  return componentOrLink ? children : <></>;
};

export default PermissionWrapper;
