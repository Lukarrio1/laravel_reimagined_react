import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { restClient } from "../Abstract/restClient";
// the save word for a empty variable is "empty_search_value" instead of passing it with an empty value
export default function useRest() {
  const { Routes } = useSelector((state) => {
    const routes = [...state?.coreNodes?.routes];
    return { Routes: routes };
  });
  return {
    restClient: async (uuid, route_params, data_to_send) => {
      const route = Routes?.filter((r) => r?.uuid == uuid)[0];
      return restClient(uuid, route_params, data_to_send, route);
    },
  };
}
