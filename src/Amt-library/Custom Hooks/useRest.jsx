import { useDispatch, useSelector } from "react-redux";
import { restClient } from "../Abstract/restClient";
import { setErrors } from "../React Base Stores/errors";
import { useState } from "react";
// the save word for a empty variable is "empty_search_value" instead of passing it with an empty value
/**
 * @description This hook return the restClient which could be used to make async calls to the serve
 * and it automatically pushes the errors to error state for ease of use
 * @returns restClient()
 */
export default function useRest() {
  const { Routes } = useSelector((state) => {
    const routes = [...state?.coreNodes?.routes];
    return { Routes: routes };
  });
  const [isLoading, setIsLoading] = useState({});
  const dispatch = useDispatch();

  const handleIsLoading = (uuid, currentState) => {
    setIsLoading((prev) => {
      prev[uuid] = currentState;
      return prev;
    });
  };
  return {
    /**
     *
     * @param {string} uuid
     * @param {object} route_params
     * @param {object} data_to_send
     * @param {boolean} use_cache
     * @description This function is used to make rest calls to the serve given
     * the uuid which is used to identify the route that is being requested
     * the route_params which is add to the url as a query string
     * the data_to_send which is sent to the server
     * the use_cache which is used to tell the rest client to cache the return data
     * @returns data
     */
    restClient: async (uuid, route_params, data_to_send, use_cache = false) => {
      const route = Routes?.find((r) => r?.uuid == uuid);
      if (!route) return null;
      handleIsLoading(uuid, true);
      try {
        const data = await restClient(
          uuid,
          route_params,
          data_to_send,
          route,
          use_cache
        );
        handleIsLoading(uuid, false);
        return data;
      } catch (error) {
        if (error != null) dispatch(setErrors(error));
        handleIsLoading(uuid, false);
        return null;
      }
    },
    /**
     *
     * @param {string} uuid
     * @description gets the loading state of a xhr request given the uuid of the route
     * @returns boolean
     */
    getIsLoading: (uuid) => {
      return isLoading[uuid]??false;
    },
  };
}
