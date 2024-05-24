import { useSelector } from "react-redux";

const PermissionWrapper = ({ uuid, children }) => {
  const { hasAccess } = useSelector((state) => {
    const temp = [...state?.authentication.permissions.map((p) => p.id), 0];
    const currentNode = [
      ...state?.coreNodes.links,
      ...state?.coreNodes.components,
    ]?.filter((cl) => cl.uuid == uuid)[0]?.permission_id;
    return {
      hasAccess: temp.includes(currentNode),
    };
  });

  return hasAccess ? children : <></>;
};

export default PermissionWrapper;
