import React from "react";
import { clearErrors } from "../Stores/errors";
import useRest from "../Custom Hooks/useRest";
import useSettings from "../Custom Hooks/useSettings";
import { Constants } from "../Abstract/Constants";
import { useParams } from "react-router-dom";
import useNavigator from "../Custom Hooks/useNavigator";

const {
  uuids: {
    auth_uuids,
    email_verification_page: { email_verification_endpoint_uuid },
    home_page: { home_page_link_uuid },
  },
} = Constants;

export default function useAuthDataLayer() {
  const { restClient, getIsLoading } = useRest();
  const { getSetting } = useSettings();
  const { setNavProperties } = useNavigator(home_page_link_uuid);
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
    const { data } = await restClient(email_verification_endpoint_uuid, {
      token: token,
    });
    sessionStorage.setItem("bearerToken", data?.token);
    window.location.href = setNavProperties({
      queryParams: {},
      params: {},
    }).node?.node_route;
  };

  return {
    login,
    register,
    verifyEmail,
    registering: () => getIsLoading(auth_uuids?.register_endpoint_uuid),
    signing: () => getIsLoading(auth_uuids.login_endpoint_uuid),
  };
}
