import React, { useMemo, useState } from "react";
import useVerbiage from "../useVerbiage";
import useErrors from "../useErrors";
import { except } from "../../Abstract/Helpers";

/**
 *@description This hook gives you the ability to create a select and programmatically control it
 * @returns [setProperties(),Value,Html,clearError,setValue]
 */

export default function useSelect() {
  const exceptions = ["label", "verbiage", "options"];

  const [selectState, setSelectState] = useState({
    name: "",
    className: "form-select",
    id: "",
    style: {},
    value: null,
    label: {
      enabled: false,
      className: "form-label",
      verbiage: {
        uuid: "",
        key: "",
        properties: {},
      },
    },
    options: [{ value: null, label: "Select a value" }],
  });

  const { getError, clearError } = useErrors();

  const errors = useMemo(
    () => getError(selectState.name),
    [selectState.name, getError, clearError]
  );

  const { getVerbiage } = useVerbiage(selectState?.label?.verbiage?.uuid);

  const Html = useMemo(
    () => (
      <>
        {selectState?.label?.enabled == true && (
          <label
            htmlFor={selectState?.id}
            className={selectState?.label?.className}
          >
            {getVerbiage(
              selectState?.label?.verbiage?.key,
              selectState?.label?.verbiage?.properties
            )}
          </label>
        )}
        <select
          {...except(selectState, exceptions)}
          onChange={(e) => {
            e.persist();
            setSelectState((pre) => {
              return {
                ...pre,
                value: e.target.value,
              };
            });
          }}
        >
          {selectState?.options &&
            selectState?.options?.map((option) => {
              return (
                <option value={option?.value} key={option?.value}>
                  {option?.label}
                </option>
              );
            })}
        </select>
        {errors?.length > 0 && (
          <div className="text-left">
            {errors.map((er, index) => (
              <div key={index} className="text-danger">
                {er}
              </div>
            ))}
          </div>
        )}
      </>
    ),
    [selectState, errors, clearError]
  );

  return {
    clearError: () => clearError(selectState?.name),
    setProperties: (
      properties = {
        className: "",
        id: "",
        style: {},
        value: null,
        name: "",
        options: [{ label: "Select a value", value: "" }],
        label: {
          enabled: false,
          className: "",
          verbiage: {
            uuid: "",
            key: "",
            properties: {},
          },
        },
      }
    ) => {
      setSelectState((pre) => {
        return { ...pre, ...properties };
      });
    },
    Html,
    Value: selectState?.value,
    setValue: (newValue) =>
      setSelectState((prev) => {
        return prev?.value == newValue
          ? { ...prev }
          : { ...prev, value: newValue };
      }),
  };
}
