import { useSelector } from "react-redux";
import NoPermission from "../../Pages/NoPermission";
/**
 *@description This is used to apply the defined permission to a component of page given the uuid
 */
const PermissionWrapper = ({ uuid, children, Alternative = null }) => {
  const { hasAccess, currentNode } = useSelector((state) => {
    const currentNode = [
      ...state?.coreNodes.links,
      ...state?.coreNodes.components,
    ]?.find((cl) => cl.uuid == uuid);
    return {
      currentNode,
      hasAccess: currentNode?.hasAccess,
    };
  });

  return hasAccess ? (
    children
  ) : !currentNode ? (
    <></>
  ) : currentNode?.node_type["value"] > 2 ? (
    Alternative ? (
      Alternative
    ) : (
      <NoPermission
        className={children?.props?.className}
        Node={currentNode}
      ></NoPermission>
    )
  ) : (
    ""
  );
};

export default PermissionWrapper;
