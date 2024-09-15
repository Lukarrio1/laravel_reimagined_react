import { useDispatch, useSelector } from "react-redux";
import { restClient } from "../Abstract/restClient";
import { setErrors } from "../React Base Stores/errors";
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
  const dispatch = useDispatch();
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
      try {
        return await restClient(
          uuid,
          route_params,
          data_to_send,
          route,
          use_cache
        );
      } catch (error) {
        if (error != null) dispatch(setErrors(error));
        return null;
      }
    },
  };
}
