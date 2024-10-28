import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMemLinksAndComponents } from "../Stores/coreNodes";
import { createQueryString } from "../Abstract/Helpers";
import { useCallback, useState } from "react";

export default function useNavigator(UUID) {
  const navigate = useNavigate();

  const Actual_link =
    useSelector((state) => {
      return getMemLinksAndComponents(state);
    }).find((cl) => cl.uuid == UUID) ?? null;

  const processLink = useCallback(
    (params = {}, queryParams = {}) => {
      const queryParamsKeys = Object.keys(queryParams);
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
      if (queryParamsKeys.length > 0) {
        linkSeg = linkSeg + createQueryString(queryParams);
      }
      return linkSeg;
    },
    [Actual_link]
  );

  return {
    setNavProperties: ({ params = {}, queryParams = {} }) => {
      const linkSeg = processLink(params, queryParams);
      return {
        navigate: () => navigate(linkSeg),
        node: { ...Actual_link, node_route: linkSeg },
      };
    },
  };
}
