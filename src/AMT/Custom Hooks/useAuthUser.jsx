import { useSelector } from "react-redux";
import { getMemProfile } from "../Stores/auth";
/**
 * @description Returns the authenticated user from state
 * @returns auth_user
 */
export default function useAuthUser() {
  return useSelector((state) => getMemProfile(state));
}
