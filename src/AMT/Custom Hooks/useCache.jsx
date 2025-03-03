import { useCallback } from "react";
import { Constants } from "../Abstract/Constants";
import { getWithTTL, setWithTTL } from "../Abstract/localStorage";
import useAppState from "./useAppState";
import useGetNode from "./useGetNode";
const { cache_prefix } = Constants;
export const INTERVAL_CACHE_KEY = "interval_cache_key_";
export const CACHE_STATUS_KEY = "cache_status_key_";
export default function useCache() {
  const getProperties = useGetNode();
  const { state, set: setCacheData } = useAppState();

  const process = useCallback(
    async (
      uuid = "",
      key = "",
      restCall = async () => null,
      ignoreCache = false
    ) => {
      const ttl = +getProperties(uuid, "node_cache_ttl");
      let cachedData = getWithTTL(key);
      if (ttl == 0) {
        const response = await restCall();
        return !response ? null : response;
      }
      setCacheData({ key: CACHE_STATUS_KEY + uuid, value: true });
      if (cachedData == null && ignoreCache == false) {
        const response = await restCall();
        if (response == null) return;
        setWithTTL(key, response, ttl);
        scheduleCacheUpdate(key, restCall, ttl, uuid);
        cachedData = response;
      }
      return cachedData;
    },
    [getProperties]
  );

  const scheduleCacheUpdate = (
    key = "",
    restCall = async () => null,
    ttl = 0,
    uuid
  ) => {
    let previous_cache_interval_keys = state[INTERVAL_CACHE_KEY + uuid] ?? [];
    const interval = setInterval(async () => {
      const response = await restCall();
      if (response == null) return;
      setWithTTL(key, response, ttl);
      setCacheData({ key: CACHE_STATUS_KEY + uuid, value: false });
    }, ttl * 1000);

    setCacheData({
      key: INTERVAL_CACHE_KEY + uuid,
      value: [...previous_cache_interval_keys, interval ?? null],
    });
  };

  const clearCache = useCallback(
    (uuid = "") => {
      const cacheNames = state[uuid] ?? [];
      const cacheIntervals = state[INTERVAL_CACHE_KEY + uuid] ?? [];
      cacheNames.forEach((name) =>
        localStorage.removeItem(cache_prefix + name)
      );
      cacheIntervals.forEach((id) => clearInterval(id));
      setCacheData({ key: INTERVAL_CACHE_KEY + uuid, value: [] });
      setCacheData({ key: uuid, value: [] });
      setCacheData({ key: CACHE_STATUS_KEY + uuid, value: false });
    },
    [state]
  );

  const getCacheStatus = useCallback(
    (uuid = "") => {
      return state[CACHE_STATUS_KEY + uuid] ?? true;
    },
    [state]
  );

  return {
    process,
    clearCache,
    getCacheStatus,
  };
}
