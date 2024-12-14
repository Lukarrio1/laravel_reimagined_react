import React from "react";
import useNavigator from "./useNavigator";
import { store } from "../../store/store";
import { getMemRedirect } from "../Stores/redirect";

export default function useRedirects({
  key = "",
  params = {},
  queryParams = {},
}) {
  const redirect = getMemRedirect(store.getState());
  const uuid = redirect[key] ?? "";
  const { setNavProperties } = useNavigator(uuid);
  const { node, navigate } = setNavProperties({ params, queryParams });
  return {
    redirect: () => navigate(),
    node: node,
  };
}
