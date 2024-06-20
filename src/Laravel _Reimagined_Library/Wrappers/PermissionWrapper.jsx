import { useSelector } from "react-redux";
import NoPermission from "../../Pages/NoPermission";
import { useEffect } from "react";

const PermissionWrapper = ({
  uuid,
  children,
  Alternative = null,
}) => {
  const { hasAccess, currentNode, site_email_address } = useSelector(
    (state) => {
      const temp = [...state?.authentication.permissions.map((p) => p.id), 0];
      const currentNode = [
        ...state?.coreNodes.links,
        ...state?.coreNodes.components,
      ]?.filter((cl) => cl.uuid == uuid)[0];
      return {
        currentNode,
        site_email_address: state?.setting?.settings?.site_email_address?.value,
        hasAccess: currentNode?.hasAccess,
      };
    }
  );

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
        site_email_address={site_email_address}
      ></NoPermission>
    )
  ) : (
    ""
  );
};

export default PermissionWrapper;
