import { useSelector } from "react-redux";
/**
 * @description Returns the authenticated user from state
 * @returns auth_user
 */
export default function useAuthUser() {
  const { auth_user } = useSelector((state) => {
    return {
      auth_user: state?.authentication?.user,
    };
  });
  return auth_user ?? null;
}
