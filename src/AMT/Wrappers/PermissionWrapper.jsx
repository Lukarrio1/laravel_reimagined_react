import { useSelector } from "react-redux";
import NoPermission from "../../Pages/NoPermission";
import { getMemLinksAndComponents } from "../Stores/coreNodes";
import { Constants } from "../Abstract/Constants";
import { memo, useMemo } from "react";

const { node_link_type_value } = Constants;

/**
 * @description The PermissionWrapper component checks whether the user has permission to access a specific component or page
 * based on the provided UUID. It renders the children if access is granted, otherwise it renders a fallback component or
 * a no-permission message.
 *
 * @param {string} uuid - The unique identifier for the current node whose permissions are being checked.
 * @param {ReactNode} children - The child components to be rendered if the user has permission.
 * @param {ReactNode|null} Alternative - An optional alternative component to render if access is denied and certain conditions are met.
 * @returns {ReactNode} - Renders children if access is granted; otherwise, it renders a no-permission message or the alternative component.
 */
const PermissionWrapper = memo(({ uuid, children, Alternative = null }) => {
  const currentNode = useSelector((state) =>
    getMemLinksAndComponents(state)
  )?.find((cl) => cl.uuid === uuid);

  // Memoize the hasAccess variable to prevent unnecessary re-renders, only recomputing when currentNode changes
  const hasAccess = useMemo(() => currentNode?.hasAccess, [currentNode]);

  // Conditional rendering based on the access status and current node's properties
  return hasAccess ? (
    // If the user has access, render the children components
    children
  ) : !currentNode ? (
    // If no current node exists (undefined or null), render nothing
    <></>
  ) : currentNode?.node_type["value"] > node_link_type_value ? (
    // Check if the node type value exceeds the defined constant threshold for permissions
    Alternative ? (
      // If an alternative component is provided, render it instead of the children
      Alternative
    ) : (
      // If no alternative is provided, render the NoPermission component
      <NoPermission
        className={children?.props?.className} // Pass down className from children if it exists for consistent styling
        Node={currentNode} // Pass the currentNode object for use within the NoPermission component, if needed
      />
    )
  ) : (
    // If none of the above conditions are met (e.g., access is denied but node type is within limits), render an empty string
    ""
  );
});

export default PermissionWrapper; // Export the PermissionWrapper component for use in other parts of the application
