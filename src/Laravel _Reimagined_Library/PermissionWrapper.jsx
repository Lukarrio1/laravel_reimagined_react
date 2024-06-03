import { useSelector } from "react-redux";

const PermissionWrapper = ({ uuid, children }) => {
  const { hasAccess } = useSelector((state) => {
    const temp = [...state?.authentication.permissions.map((p) => p.id), 0];
    const auth_user = state.authentication.user;
    const currentNode = [
      ...state?.coreNodes.links,
      ...state?.coreNodes.components,
    ]?.filter((cl) => cl.uuid == uuid)[0];
    return {
      hasAccess:
        temp.includes(currentNode?.permission_id) && currentNode?.hasAccess,
    };
  });

  return hasAccess ? children : <></>;
};

export default PermissionWrapper;
