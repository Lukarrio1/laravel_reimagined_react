import { useSelector } from "react-redux";
import NoPermission from "../../Pages/NoPermission";
import { getMemLinksAndComponents } from "../Stores/coreNodes";
import { Constants } from "../Abstract/Constants";
import { memo, useMemo } from "react";
/**
 *@description This is used to apply the defined permission to a component of page given the uuid
 */

const { node_link_type_value } = Constants;

const PermissionWrapper = memo(({ uuid, children, Alternative = null }) => {
  const currentNode = useSelector((state) =>
    getMemLinksAndComponents(state)
  )?.find((cl) => cl.uuid == uuid);

  const hasAccess = useMemo(() => currentNode?.hasAccess, [currentNode]);

  return hasAccess ? (
    children
  ) : !currentNode ? (
    <></>
  ) : currentNode?.node_type["value"] > node_link_type_value ? (
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
});

export default PermissionWrapper;
