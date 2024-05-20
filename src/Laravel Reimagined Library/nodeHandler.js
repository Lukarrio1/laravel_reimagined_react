import { node_route, restClient } from "./restClient";

export const handleNode = async (
    node,
    AlternateComponent = null,
    properties = {}
) => {
    if (!node) return AlternateComponent;

    console.log();
};
