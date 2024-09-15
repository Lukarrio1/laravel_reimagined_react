import React, { useEffect } from "react";
import { useSelector } from "react-redux";
/**
 *@description This hook is used to get the verbiage associated
 with item found comparing the uuid given and the uuid from the item
 * @param {string} uuid
 * @returns getVerbiage()
 */
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
    /**
     *@description getVerbiage is used to get a specific piece of content given key and properties,
     properties is the data that should be interpolated in the content eg {name:'foo'}
     content="Hello {name}"
     output="Hello foo"
     * @param {string} key
     * @param {object} properties
     * @param {array} addPrefixOrSuffix
     * @returns
     */
    getVerbiage: (
      key,
      properties = {},
      addPrefixOrSuffix = [
        // { variable_name: "", value_to_attach: "", addPrefixOrSuffix: true  //true to prepend, false to append },
      ]
    ) => {
      return PageVerbiage[key] != undefined && PageVerbiage[key] != null ? (
        <span
          dangerouslySetInnerHTML={{
            __html: PageVerbiage[key]
              ?.split(" ")
              .map((item) => {
                if (item.split("{-").length > 1) {
                  const variable = item
                    .split("{-")
                    .filter((new_item) => new_item.length > 0)[0]
                    ?.split("-}")
                    .filter((new_item) => new_item.length > 0)[0];

                  const middle_seg = item
                    .split("{-")
                    .filter((new_item) => new_item.length > 0)[1]
                    ?.split("-}")[0];

                  const first_seg =
                    middle_seg == undefined
                      ? ""
                      : item
                          .split("{-")
                          .filter((new_item) => new_item.length > 0)[0] ?? "";

                  const last_seg =
                    middle_seg == undefined
                      ? ""
                      : item
                          .split("{-")
                          .filter((new_item) => new_item.length > 0)[1]
                          ?.split("-}")[1] ?? "";
                  return properties[
                    middle_seg != undefined ? middle_seg : variable
                  ] != undefined
                    ? `${first_seg}${updateValues(
                        middle_seg != undefined ? middle_seg : variable,
                        properties[
                          middle_seg != undefined ? middle_seg : variable
                        ] ?? "",
                        addPrefixOrSuffix
                      )}${last_seg}`
                    : "";
                }
                return item;
              })
              .join(" "),
          }}
        ></span>
      ) : (
        ""
      );
    },
  };
}
