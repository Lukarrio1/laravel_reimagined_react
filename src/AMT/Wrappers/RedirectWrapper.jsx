import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom"; // Hook to programmatically navigate between routes
import { Constants } from "../Abstract/Constants"; // Constants used throughout the application
import useAuthUser from "../Custom Hooks/useAuthUser"; // Custom hook for retrieving authenticated user data
import useSettings from "../Custom Hooks/useSettings"; // Custom hook for application settings
import useVerbiage from "../Custom Hooks/useVerbiage"; // Custom hook for retrieving verbiage

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
const RedirectWrapper = ({ children, page }) => {
  const { getSetting } = useSettings();
  const auth_user = useAuthUser();

  const { getVerbiage } = useVerbiage(redirect_wrapper_component_uuid);

  const navigate = useNavigate();

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
    }, 2000); // Wait for 1.5 seconds before executing the redirection logic

    return () => clearTimeout(timeout); // Cleanup timeout on component unmount
  }, [page, auth_user, getSetting]);

  // Hook to retrieve verbiage for the redirect wrapper

  // Memoize the rendered HTML content to optimize performance
  const Html = useMemo(
    () => (
      <>
        {page?.hasAccess === false ? (
          // If the user does not have access, show a warning message
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="col-sm-8 col-md-6 col-lg-5">
              <div
                className="alert alert-primary text-center shadow-lg p-4 rounded"
                role="alert"
              >
                <h4 className="alert-heading mb-3">
                  {getVerbiage("page_message")}
                </h4>
                <p className="mb-3">
                  {getVerbiage("on_redirect_message", {
                    url: auth_user
                      ? getSetting("redirect_to_after_login", "key")
                      : getSetting("redirect_to_after_logout", "key"),
                  })}
                </p>
                <p>{getVerbiage("page_message_two")}</p>
                <p>
                  {getVerbiage("page_message_three")}{" "}
                  <a
                    href={
                      auth_user
                        ? getSetting("redirect_to_after_login")
                        : getSetting("redirect_to_after_logout")
                    }
                  >
                    {auth_user
                      ? getSetting("redirect_to_after_login", "key")
                      : getSetting("redirect_to_after_logout", "key")}
                  </a>
                </p>
                <div className="d-flex justify-content-center mt-4">
                  <div className="spinner-border text-warning" role="status" />
                </div>
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
};

export default RedirectWrapper;
