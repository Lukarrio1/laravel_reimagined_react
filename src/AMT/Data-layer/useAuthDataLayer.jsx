import React from "react";
import { clearErrors } from "../Stores/errors";
import useRest from "../Custom Hooks/useRest";
import useSettings from "../Custom Hooks/useSettings";
import { Constants } from "../Abstract/Constants";

export default function useAuthDataLayer() {
  const { restClient, getIsLoading } = useRest();
  const { getSetting } = useSettings();

  const {
    uuids: { auth_uuids },
  } = Constants;

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

  return {
    login,
    register,
    registering: () => getIsLoading(auth_uuids?.register_endpoint_uuid),
    signing: () => getIsLoading(auth_uuids.login_endpoint_uuid),
  };
}
