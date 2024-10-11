import { useSelector } from "react-redux";
import NoPermission from "../../Pages/NoPermission";
import { getMemLinksAndComponents } from "../Stores/coreNodes";
/**
 *@description This is used to apply the defined permission to a component of page given the uuid
 */
const PermissionWrapper = ({ uuid, children, Alternative = null }) => {
  const currentNode = useSelector((state) =>
    getMemLinksAndComponents(state)
  )?.find((cl) => cl.uuid == uuid);
  const hasAccess = currentNode?.hasAccess ?? false;

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
