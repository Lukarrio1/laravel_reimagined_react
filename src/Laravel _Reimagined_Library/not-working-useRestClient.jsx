import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const node_route = "http://localhost:8000/api/nodes/";

const setUpAuth = (node) =>
  node?.authentication_level["value"] == 1
    ? axios.create({
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("bearerToken")}`,
        },
      })
    : axios;

const build_rest_url = (url, params) =>
  Object.keys(params).length === 0
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

export const useRestClient = (
  initialRouteUuid = "",
  initialRouteParams = {},
  initialDataToSend = {}
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [routeUuid, setRouteUuid] = useState(initialRouteUuid);
  const [routeParams, setRouteParams] = useState(initialRouteParams);
  const [dataToSend, setDataToSend] = useState(initialDataToSend);

  const fetchData = useCallback(async () => {
    if(!routeUuid)return
    try {
      setLoading(true);
      const {
        data: { node },
      } = await axios.get(node_route + routeUuid);

      if (!node) {
        throw new Error("Node not found");
      }

      const {
        properties: { value },
      } = node;

      const result = await build_rest_client(
        build_rest_url(value?.node_route, routeParams),
        value,
        dataToSend,
        node
      );
      setData(result.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [routeUuid, routeParams, dataToSend]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const setProperties = (
    newRouteUuid,
    newRouteParams = {},
    newDataToSend = {}
  ) => {
    setRouteUuid(newRouteUuid);
    setRouteParams(newRouteParams);
    setDataToSend(newDataToSend);
    fetchData();
  };

  return { data, loading, error, setProperties };
};
