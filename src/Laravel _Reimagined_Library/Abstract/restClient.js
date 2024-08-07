import axios from "axios";
export const node_route = "http://amt.niritech.co/api/nodes/";

export const restClient = async (
  route_uuid = "",
  route_params = {},
  data_to_send = {},
  route_data = null
) => {
  let node = !route_data ? await getNodeData(route_uuid) : route_data;
  if (!node) {
    return -1;
  }
  const {
    properties: { value },
  } = node;

  return build_rest_client(
    build_rest_url(value?.node_route, route_params),
    value,
    data_to_send,
    node
  );
};

const getNodeData = async (route_uuid) => {
  const {
    data: { node },
  } = await axios.get(node_route + route_uuid);
  return node;
};

const setUpAuth = (node) =>
  node?.authentication_level["value"] == 1
    ? axios.create({
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("bearerToken")}`,
        },
      })
    : axios;

const build_rest_url = (url, params) =>
  Object.keys(params).length == 0
    ? url
    : url
        .split("/")
        .map((seg) => {
          return translate_params(params)[seg]
            ? translate_params(params)[seg]
            : seg;
        })
        .join("/");

const translate_params = (params) => {
  const translation = {};
  Object.keys(params).forEach((param) => {
    translation[`{${param}}`] = params[param];
  });
  return translation;
};

const build_rest_client = (route, route_values, data, node) =>
  setUpAuth(node)[route_values["route_method"]](route, data);
