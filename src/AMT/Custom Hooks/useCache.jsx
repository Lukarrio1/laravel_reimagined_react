import { getWithTTL, setWithTTL } from "../Abstract/localStorage";
import useGetNode from "./useGetNode";

export default function useCache() {
  const { getProperties } = useGetNode();

  const process = async (uuid = "", key = "", restCall = async () => null) => {
    const ttl = +getProperties(uuid, "node_cache_ttl");
    let cachedData = getWithTTL(key);
    if (ttl == 0) {
      const response = await restCall();
      if (response == null) return;
      const { data } = response;
      return data;
    }

    if (cachedData == null) {
      const response = await restCall();
      if (response == null) return;
      const { data } = response;
      setWithTTL(key, data, ttl);
      cachedData = data;
    }
    return cachedData;
  };
  return {
    process,
  };
}
