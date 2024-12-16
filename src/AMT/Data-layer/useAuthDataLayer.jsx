import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Constants } from "../Abstract/Constants";
import useNavigator from "../Custom Hooks/useNavigator";
import useRest from "../Custom Hooks/useRest";
import useSettings from "../Custom Hooks/useSettings";
import useSystemMessage from "../Custom Hooks/useSystemMessage";
import { logout, setAuthProperties } from "../Stores/auth";
import { clearErrors } from "../Stores/errors";

const {
  uuids: {
    auth_uuids,
    email_verification_page: { email_verification_endpoint_uuid },
    home_page: { home_page_link_uuid },
    user_uuids: { profile_endpoint_uuid },
  },
} = Constants;

export default function useAuthDataLayer() {
  const { restClient, getIsLoading } = useRest();
  const { setMessage } = useSystemMessage();
  const { getSetting } = useSettings();
  const { setNavProperties } = useNavigator(home_page_link_uuid);
  const dispatch = useDispatch();
  const { token } = useParams();

  const login = async (obj) => {
    clearErrors("invalid_credentials");
    const response = await restClient(
      auth_uuids?.login_endpoint_uuid,
      {},
      { ...obj }
    );
    if (response === null) return;
    const { data } = response;
    sessionStorage.setItem("bearerToken", data?.token);
    window.location.href = getSetting("redirect_to_after_login");
  };

  const logoutUser = async () => {
    clearErrors();
    const response = await restClient(auth_uuids.logout_endpoint_uuid);
    if (response == null) return;
    dispatch(logout());
    window.location.href = getSetting("redirect_to_after_logout");
  };

  const register = async (obj) => {
    const response = await restClient(
      auth_uuids?.register_endpoint_uuid,
      {},
      { ...obj }
    );
    if (response === null) return;
    const { data } = response;
    sessionStorage.setItem("bearerToken", data?.token);
    window.location.href = getSetting("redirect_to_after_register");
  };

  const verifyEmail = async () => {
    const response = await restClient(email_verification_endpoint_uuid, {
      token: token,
    });
    if (response == null) return;
    const { data } = response;
    sessionStorage.setItem("bearerToken", data?.token);
    window.location.href = setNavProperties({
      queryParams: {},
      params: {},
    }).node?.node_route;
  };

  const sendPasswordResetEmail = async (obj) => {
    const response = await restClient(
      auth_uuids?.password_reset_email_endpoint_uuid,
      {},
      obj
    );
    if (response == null) return;
    const { data } = response;
    setMessage(data?.message);
  };

  const updateUserPassword = async (obj) => {
    const response = await restClient(
      auth_uuids?.password_reset_endpoint_uuid,
      { param: token },
      obj
    );
    if (response == null) return;
    const { data } = response;
    setMessage(data?.message);
    setTimeout(
      () =>
        (window.location.href = getSetting("redirect_to_after_password_reset")),
      3000
    );
  };

  const getUserProfile = async () => {
    try {
      const {
        data: { user },
      } = await restClient(profile_endpoint_uuid);
      dispatch(setAuthProperties(user));
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    getUserProfile,
    logoutUser,
    login,
    register,
    verifyEmail,
    sendPasswordResetEmail,
    updateUserPassword,
    updatingUserPassword: () =>
      getIsLoading(auth_uuids?.password_reset_endpoint_uuid),
    sendingPasswordResetEmail: () =>
      getIsLoading(auth_uuids?.password_reset_email_endpoint_uuid),
    registering: () => getIsLoading(auth_uuids?.register_endpoint_uuid),
    loggingout: () => getIsLoading(auth_uuids?.logout_endpoint_uuid),
    signing: () => getIsLoading(auth_uuids.login_endpoint_uuid),
  };
}
