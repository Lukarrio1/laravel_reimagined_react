import { useEffect, useMemo } from "react";
import { Constants } from "../Abstract/Constants";
import useVerbiage from "./useVerbiage";
import { getWithTTL } from "../Abstract/localStorage";
import { restClient } from "../Abstract/restClient";

const {
  uuids: {
    system_uuids: { monitor_endpoint_uuid, settings_endpoint_uuid },
  },
} = Constants;

export default function useMonitorCache() {
  const { getVerbiage } = useVerbiage(monitor_endpoint_uuid);

  const monitor_cache_ttl = useMemo(
    () => +getVerbiage("timeout", {}, true),
    [getVerbiage]
  );

  const monitorCache = async () => {
    let current_cache_token = getWithTTL(settings_endpoint_uuid);
    if (current_cache_token != null || current_cache_token !== undefined) {
      current_cache_token = current_cache_token?.find(
        (s) => s.key === "is_cache_valid"
      )?.properties?.value;
    } else return;
    const { data } = await restClient(monitor_endpoint_uuid);
    if (!data?.is_cache_valid) return;
    if (data?.is_cache_valid !== current_cache_token) {
      if (current_cache_token) localStorage.clear();
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      monitorCache();
    }, monitor_cache_ttl);
    return () => clearTimeout(timeout);
  }, [monitor_cache_ttl]);
}
