import React from "react";

import { useDispatch } from "react-redux";
import { setAuthProperties } from "../Stores/auth";
import { Constants } from "../Abstract/Constants";
import useRest from "../Custom Hooks/useRest";
const {
  uuids: {
    user_uuids: { profile_endpoint_uuid },
  },
} = Constants;

export default function useUserDataLayer() {
  const dispatch = useDispatch();

  const { restClient, getIsLoading } = useRest();

  const getProfile = async () => {
    const response = await restClient(profile_endpoint_uuid);
    if (response == null) return;
    const { user } = response;
    dispatch(setAuthProperties(user));
  };

  return {
    getProfile,
    gettingProfile: () => getIsLoading(profile_endpoint_uuid),
  };
}
