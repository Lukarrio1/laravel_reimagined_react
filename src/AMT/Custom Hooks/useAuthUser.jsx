import { useSelector } from "react-redux";
import { getMemProfile } from "../Stores/auth";

/**
 * @description Custom hook that retrieves the authenticated user from the Redux store.
 * This hook uses the useSelector hook to access the user profile state.
 * @returns {Object|null} auth_user - The authenticated user's profile or null if not authenticated.
 */
export default function useAuthUser() {
  // Use the useSelector hook to retrieve the authenticated user profile from the Redux state
  return useSelector((state) => getMemProfile(state));
}
