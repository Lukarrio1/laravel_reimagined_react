import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function usePageVerbiage(uuid) {
  const { PageVerbiage } = useSelector((state) => {
    const item = [
      ...state?.coreNodes?.pages,
      ...state?.coreNodes?.components,
    ]?.filter((item) => item?.uuid == uuid)[0];
    return {
      PageVerbiage: item?.verbiage,
    };
  });
  return {
    getVerbiage: (key, properties = {}) => {
      return PageVerbiage[key] != undefined
        ? PageVerbiage[key]
            ?.split(" ")
            .map((item) => {
              if (item.split("{-").length > 1) {
                const variable = item
                  .split("{-")
                  .filter((new_item) => new_item.length > 0)[0]
                  ?.split("-}")
                  .filter((new_item) => new_item.length > 0)[0];
                return properties[variable] != undefined
                  ? properties[variable]
                  : "";
              }
              return item;
            })
            .join(" ")
        : "";
    },
  };
}
