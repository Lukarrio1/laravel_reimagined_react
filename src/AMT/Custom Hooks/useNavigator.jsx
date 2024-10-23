import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMemLinksAndComponents } from "../Stores/coreNodes";

export default function useNavigator(UUID) {
  const navigate = useNavigate();
  const Actual_link =
    useSelector((state) => {
      return getMemLinksAndComponents(state);
    }).find((cl) => cl.uuid == UUID) ?? null;
  return {
    setNavProperties: ({ params = {} }) => {
      let linkSeg =
        Actual_link?.properties?.value?.node_route?.split("/") ?? [];
      const linkSegValue = {};
      Object.keys(params)?.forEach((key) => {
        linkSegValue[":" + key] = params[key];
      });
      linkSeg = linkSeg
        .map((seg) => {
          if (linkSegValue[seg] != null) {
            return linkSegValue[seg];
          }
          return seg;
        })
        .join("/");
      navigate(linkSeg);
    },
    node: { ...Actual_link },
  };
}
