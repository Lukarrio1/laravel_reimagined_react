import { useSelector } from "react-redux";
import {
  getLinksPagesLayoutsAndComponents,
  getMemRoutes,
} from "../Stores/coreNodes";

export default function useGetNode(uuid = "") {
  const Node = [
    ...useSelector((state) => getLinksPagesLayoutsAndComponents(state)),
    ...useSelector((state) => getMemRoutes(state)),
  ]?.find((node) => node?.uuid === uuid);

  return {
    node: { ...Node },
    getProperties: (prop = null) =>
      prop
        ? Node?.properties?.value[prop] === undefined
          ? null
          : Node?.properties?.value[prop]
        : Node?.properties?.value,
  };
}
