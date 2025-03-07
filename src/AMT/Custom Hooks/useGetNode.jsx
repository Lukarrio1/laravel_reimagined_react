import { useSelector } from "react-redux";
import {
  getLinksPagesLayoutsAndComponents,
  getMemRoutes,
} from "../Stores/coreNodes";

export default function useGetNode() {
  const Nodes = [
    ...useSelector((state) => getLinksPagesLayoutsAndComponents(state)),
    ...useSelector((state) => getMemRoutes(state)),
  ];
  return (uuid, prop = null) => {
    const Node = Nodes?.find((node) => node?.uuid === uuid);
    return prop
      ? Node?.properties?.value[prop] === undefined
        ? null
        : Node?.properties?.value[prop]
      : Node?.properties?.value;
  };
}
