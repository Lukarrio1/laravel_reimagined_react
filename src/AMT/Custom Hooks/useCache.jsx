import { getWithTTL, setWithTTL } from "../Abstract/localStorage";
import useGetNode from "./useGetNode";

export default function useCache(uuid = "") {
  const { getProperties } = useGetNode(uuid);
  const ttl = +getProperties("node_cache_ttl");
  const cachedRestData = async (key = "", restCall = async () => null) => {
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
    cachedRestData,
  };
}
