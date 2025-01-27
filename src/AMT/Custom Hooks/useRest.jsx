import { useDispatch, useSelector } from "react-redux";
import { restClient } from "../Abstract/restClient";
import { setErrors } from "../Stores/errors";
import { useCallback } from "react";

import { getMemRoutes } from "../Stores/coreNodes";
import { setLoadingProperties } from "../Stores/loading";
import useIsLoading from "./useIsLoading";
import useCache from "./useCache";

/**
 * @description This hook returns the restClient which can be used to make async calls to the server
 * and it automatically pushes errors to error state for ease of use.
 * @returns {object} - An object containing the restClient function and loading state functions.
 */
export default function useRest() {
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
  const processCache = useCache();
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
        const data = await processCache.process(
          uuid,
          uuid + "_data",
          async () =>
            await restClient(
              uuid,
              route_params,
              data_to_send,
              route,
              use_cache,
              query_params
            )
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
