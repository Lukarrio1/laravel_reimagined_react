import { useDispatch, useSelector } from "react-redux";
import { restClient } from "../Abstract/restClient";
import { setErrors } from "../Stores/errors";
import { useCallback } from "react";

import { getMemRoutes } from "../Stores/coreNodes";
import { setLoadingProperties } from "../Stores/loading";
import useIsLoading from "./useIsLoading";
import useSystemMessage from "./useSystemMessage";

/**
 * @description This hook returns the restClient which can be used to make async calls to the server
 * and it automatically pushes errors to error state for ease of use.
 * @returns {object} - An object containing the restClient function and loading state functions.
 */
export default function useRest() {
  const { setMessage } = useSystemMessage();
  const Routes = useSelector((state) => getMemRoutes(state)); // Retrieve routes from Redux state
  const { isLoading, isLoadingV2 } = useIsLoading(); // Get loading states from the custom hook
  const dispatch = useDispatch(); // Initialize the Redux dispatch function

  /**
   * @description Handles loading state for a specific UUID.
   * @param {string} uuid - The unique identifier for the route.
   * @param {boolean} currentState - The current loading state (true/false).
   */
  const handleIsLoading = useCallback(
    (uuid, currentState, loading_ref) => {
      dispatch(
        setLoadingProperties({ key: uuid, loading: currentState, loading_ref })
      ); // Dispatch loading state
    },
    [dispatch]
  ); // Dependency for memoization

  /**
   * @description Fetches data from the server using the rest client.
   * @param {string} uuid - The unique identifier for the route.
   * @param {object} route_params - Parameters to be included in the route.
   * @param {object} data_to_send - Data to be sent in the request body.
   * @param {object} route - The route object retrieved from Redux state.
   * @param {boolean} use_cache - Flag to indicate if caching should be used.
   * @param {object} query_params - Query parameters to be appended to the URL.
   * @returns {Promise<object>} - The data retrieved from the server.
   */
  const fetchData = async (
    uuid,
    route_params,
    data_to_send,
    route,
    use_cache,
    query_params
  ) => {
    const data = await restClient(
      uuid,
      route_params,
      data_to_send,
      route,
      use_cache,
      query_params
    ); // Call the rest client to fetch data
    return data; // Return the fetched data
  };

  /**
   * @description Handles caching of fetched data based on TTL.
   * @param {string} uuid - The unique identifier for the route.
   * @param {object} route_params - Parameters to be included in the route.
   * @param {object} data_to_send - Data to be sent in the request body.
   * @param {object} route - The route object retrieved from Redux state.
   * @param {boolean} use_cache - Flag to indicate if caching should be used.
   * @param {object} query_params - Query parameters to be appended to the URL.
   * @returns {Promise<object>} - The data retrieved from the server.
   */
  const handleCaching = async (
    uuid,
    route_params,
    data_to_send,
    route,
    use_cache = false,
    query_params
  ) => {
    // Uncomment and implement caching logic as needed
    // const node_cache_ttl = route?.properties?.value?.node_cache_ttl;
    // const cache_name = `${uuid}_${node_cache_ttl}`;
    // const cached_data = getWithTTL(cache_name);
    // if (node_cache_ttl > 0) {
    //   if (!cached_data) {
    //     const data = await fetchData(uuid, route_params, data_to_send, route, use_cache);
    //     setWithTTL(cache_name, data, node_cache_ttl);
    //     return data;
    //   } else {
    //     return cached_data;
    //   }
    // }
    return await fetchData(
      uuid,
      route_params,
      data_to_send,
      route,
      use_cache,
      query_params
    ); // Return the fetched data
  };

  return {
    restClient: async (
      uuid,
      route_params = {},
      data_to_send = {},
      use_cache = false,
      query_params = {},
      loading_state_ref = 0
    ) => {
      const route = Routes?.find((r) => r?.uuid === uuid); // Find the route by UUID
      if (!route) {
        // setMessage({
        //   message: "Something went wrong try again later ...",
        //   className: "text-center h3 text-danger",
        // });
        return null;
      } // Return null if route is not found
      handleIsLoading(uuid, true, loading_state_ref); // Set loading state to true
      try {
        const data = await handleCaching(
          uuid,
          route_params,
          data_to_send,
          route,
          use_cache,
          query_params
        ); // Fetch data with caching
        handleIsLoading(uuid, false, loading_state_ref); // Set loading state to false
        return data; // Return the fetched data
      } catch (error) {
        if (error != null) {
          dispatch(setErrors(error));
        } // Dispatch error if present
        handleIsLoading(uuid, false, loading_state_ref); // Set loading state to false
        return null; // Return null in case of error
      }
    },
    /**
     * @description Gets the loading state of a request given the UUID of the route.
     * @param {string} uuid - The unique identifier for the route.
     * @returns {boolean} - The loading state (true/false).
     */
    getIsLoading: (uuid) => {
      return isLoading(uuid) ?? false; // Return the loading state
    },
    getIsLoadingV2: (uuid) => {
      const isLoading = isLoadingV2(uuid);
      return {
        isLoading: isLoading?.isLoading ?? false,
        loading_ref: isLoading?.loading_ref ?? null,
      };
    },
  };
}
