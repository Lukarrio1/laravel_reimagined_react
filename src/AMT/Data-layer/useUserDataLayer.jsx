import React from "react";
import { restClient } from "../Abstract/restClient";
import { useDispatch } from "react-redux";
import { setAuthProperties } from "../Stores/auth";
import { Constants } from "../Abstract/Constants";
const {
  uuids: {
    user_uuids: { profile_endpoint_uuid },
  },
} = Constants;
export default function useUserDataLayer() {
  const dispatch = useDispatch();

  const getProfile = async () => {
    try {
      const {
        data: { user },
      } = await restClient(profile_endpoint_uuid);
      dispatch(setAuthProperties(user));
      return;
    } catch (error) {}
  };

  return {
    getProfile,
  };
}
