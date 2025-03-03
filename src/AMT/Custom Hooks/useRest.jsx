import { useDispatch, useSelector } from "react-redux";
import { restClient } from "../Abstract/restClient";
import { setErrors } from "../Stores/errors";
import { useCallback } from "react";

import { getMemRoutes } from "../Stores/coreNodes";
import { setLoadingProperties } from "../Stores/loading";
import useIsLoading from "./useIsLoading";
import useCache from "./useCache";
import { createCacheName } from "../Abstract/Helpers";
import useAppState from "./useAppState";
import useGetNode from "./useGetNode";

export default function useRest() {
  const Routes = useSelector((state) => getMemRoutes(state)); // Retrieve routes from Redux state
  const { isLoading, isLoadingV2 } = useIsLoading(); // Get loading states from the custom hook
  const dispatch = useDispatch(); // Initialize the Redux dispatch function
  const { state, set: setCacheKey } = useAppState();
  /**
   * @description Handles loading state for a specific UUID.
   * @param {string} uuid - The unique identifier for the route.
   * @param {boolean} currentState - The current loading state (true/false).
   */
  const handleIsLoading = useCallback(
    (uuid, currentState, loading_ref) => {
      dispatch(
        setLoadingProperties({ key: uuid, loading: currentState, loading_ref })
      );
    },
    [dispatch]
  );
  const processCache = useCache();

  const getProperties = useGetNode();

  return {
    restClient: async (
      uuid,
      route_params = {},
      data_to_send = {},
      query_params = {},
      ignoreCache = false,
      loading_state_ref = 0
    ) => {
      const route = Routes?.find((r) => r?.uuid === uuid);
      const route_method = getProperties(uuid, "route_method");
      if (!route) {
        return null;
      }
      handleIsLoading(uuid, true, loading_state_ref);
      try {
        const cacheName = uuid + "_" + createCacheName(query_params);
        if (route_method === "get") {
          const restCacheNames = state[uuid] ?? [];
          setCacheKey({
            key: uuid,
            value: [
              ...(restCacheNames?.filter((cn) => cn !== cacheName) ?? []),
              cacheName,
            ],
          });
        }
        const data = await processCache.process(
          uuid,
          cacheName,
          async () =>
            await restClient(
              uuid,
              route_params,
              data_to_send,
              route,
              query_params
            ),
          ignoreCache
        );
        handleIsLoading(uuid, false, loading_state_ref);
        return data;
      } catch (error) {
        if (error != null) {
          dispatch(setErrors(error));
        }
        handleIsLoading(uuid, false, loading_state_ref);
        return null;
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
