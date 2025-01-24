import React, { memo, useEffect, useLayoutEffect, useMemo } from "react";
import useVerbiage from "../Custom Hooks/useVerbiage"; // Custom hook for retrieving verbiage
import { useNavigate } from "react-router-dom"; // Hook to programmatically navigate between routes
import useSettings from "../Custom Hooks/useSettings"; // Custom hook for application settings
import useAuthUser from "../Custom Hooks/useAuthUser"; // Custom hook for retrieving authenticated user data
import { Constants } from "../Abstract/Constants"; // Constants used throughout the application

const {
  uuids: {
    system_uuids: { redirect_wrapper_component_uuid },
  },
} = Constants;
/**
 * A component that handles redirection for users based on their authentication status
 * and access permissions for a specific page.
 *
 * @component
 * @param {Object} props - The props for the RedirectWrapper component.
 * @param {React.ReactNode} props.children - The child components to render if access is granted.
 * @param {Object} props.page - The page object containing access information.
 * @param {boolean} props.page.hasAccess - Flag indicating whether the user has permission to access the page.
 *
 * @returns {JSX.Element} A warning message if access is denied or the child components if access is granted.
 */
const RedirectWrapper = memo(({ children, page }) => {
  const { getSetting } = useSettings();
  const auth_user = useAuthUser();

  const navigate = useNavigate();

  const { getVerbiage } = useVerbiage(redirect_wrapper_component_uuid); // Hook to retrieve verbiage for the redirect wrapper

  const redirectTimeout = useMemo(
    () => +getVerbiage("timeout", {}, true),
    [getVerbiage]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Set a timeout to manage the redirection logic
      if (auth_user && page?.hasAccess === false) {
        // If the user is authenticated but lacks access
        navigate(getSetting("redirect_to_after_login")); // Redirect to the specified post-login page
        return;
      }
      if (!auth_user && page?.hasAccess === false) {
        // If the user is not authenticated and lacks access
        navigate(getSetting("redirect_to_after_logout")); // Redirect to the specified post-logout page
        return;
      }
    }, redirectTimeout);

    return () => clearTimeout(timeout); // Cleanup timeout on component unmount
  }, [page, auth_user, redirectTimeout]);
  // Memoize the rendered HTML content to optimize performance
  const Html = useMemo(
    () => (
      <>
        {page?.hasAccess === false ? (
          // If the user does not have access, show a warning message
          <div className="row">
            <div className="col-sm-6 offset-sm-3 h4 mt-5 text-center">
              <div className="alert alert-warning" role="alert">
                {getVerbiage("on_redirect_message", {
                  url: auth_user
                    ? getSetting("redirect_to_after_login", "key") // URL for logged-in users
                    : getSetting("redirect_to_after_logout", "key"), // URL for logged-out users
                })}
              </div>
            </div>
          </div>
        ) : (
          // If the user has access, render the child components
          children
        )}
      </>
    ),
    [page, auth_user, getSetting, getVerbiage] // Dependencies for the memoized value
  );

  return Html;
});

export default RedirectWrapper;
