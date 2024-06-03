import { useSelector } from "react-redux";
import NoPermission from "../Pages/NoPermission";

const PermissionWrapper = ({ uuid, children }) => {
  const { hasAccess, currentNode } = useSelector((state) => {
    const temp = [...state?.authentication.permissions.map((p) => p.id), 0];
    const auth_user = state.authentication.user;
    const currentNode = [
      ...state?.coreNodes.links,
      ...state?.coreNodes.components,
    ]?.filter((cl) => cl.uuid == uuid)[0];
    return {
      currentNode,
      hasAccess:
        temp.includes(currentNode?.permission_id) && currentNode?.hasAccess,
    };
  });

  return hasAccess ? (
    children
  ) : !currentNode ? (
    <></>
  ) : (
    <NoPermission></NoPermission>
  );
};

export default PermissionWrapper;
