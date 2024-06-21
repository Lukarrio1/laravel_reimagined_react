import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function useVerbiage(uuid) {
  const { PageVerbiage } = useSelector((state) => {
    const item = [
      ...state?.coreNodes?.pages,
      ...state?.coreNodes?.components,
      ...state?.coreNodes?.links,
      ...state?.coreNodes?.layouts,
    ]?.filter((item) => item?.uuid == uuid)[0];
    return {
      PageVerbiage: item?.verbiage,
    };
  });
  const updateValues = (
    variable_name,
    variable_value,
    addPrefixOrSuffix = []
  ) => {
    const variable_to_update = addPrefixOrSuffix?.filter(
      (item) => item?.variable_name == variable_name
    )[0];
    return variable_to_update == null
      ? variable_value
      : variable_to_update?.addPrefixOrSuffix == true
      ? `${variable_to_update?.value_to_attach}${variable_value}`
      : `${variable_value}${variable_to_update?.value_to_attach}`;
  };

  return {
    getVerbiage: (
      key,
      properties = {},
      addPrefixOrSuffix = [
        // { variable_name: "", value_to_attach: "", addPrefixOrSuffix: true  //true to prepend, false to append },
      ]
    ) => {
      return PageVerbiage[key] != undefined && PageVerbiage[key] != null
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
                  ? updateValues(
                      variable,
                      properties[variable] ?? "",
                      addPrefixOrSuffix
                    )
                  : "";
              }
              return item;
            })
            .join(" ")
        : "";
    },
  };
}
