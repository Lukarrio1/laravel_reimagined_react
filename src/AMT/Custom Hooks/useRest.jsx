import { useDispatch, useSelector } from "react-redux";
import { restClient } from "../Abstract/restClient";
import { setErrors } from "../Stores/errors";
import { useState } from "react";
import { getWithTTL, setWithTTL } from "../Abstract/localStorage";
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

  const fetchData = async (
    uuid,
    route_params,
    data_to_send,
    route,
    use_cache
  ) => {
    const data = await restClient(
      uuid,
      route_params,
      data_to_send,
      route,
      use_cache
    );
    return data;
  };

  const handleCaching = async (
    uuid,
    route_params,
    data_to_send,
    route,
    use_cache = false
  ) => {
    // const node_cache_ttl = route?.properties?.value?.node_cache_ttl;
    // const cache_name = `${uuid}_${node_cache_ttl}`;
    // const cached_data = getWithTTL(cache_name);
    // if (node_cache_ttl > 0) {
    //   if (!cached_data) {
    //     const data = await fetchData(
    //       uuid,
    //       route_params,
    //       data_to_send,
    //       route,
    //       use_cache
    //     );
    //     setWithTTL(cache_name, data, node_cache_ttl);
    //     return data;
    //   } else {
    //     return cached_data;
    //   }
    // }
    return await fetchData(uuid, route_params, data_to_send, route, use_cache);
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
        const data = await handleCaching(
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
      return isLoading[uuid] ?? false;
    },
  };
}
