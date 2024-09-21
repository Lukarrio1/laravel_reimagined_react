import React, { useState, useMemo, useEffect } from "react";
import useErrors from "../useErrors";
import useVerbiage from "../useVerbiage";

/**
 *@description This hook gives you the ability to create a input and programmatically control it
 * @returns [setProperties(),value,html,clearError,setValue]
 */
export default function useInput() {
  const { getError, clearError } = useErrors();

  const [inputState, setInputState] = useState({
    className: "",
    id: "",
    type: "",
    name: "",
    value: "",
    label: {
      className: "form-label",
    },
    verbiage: {
      uuid: "",
      key: "",
    },
  });

  const errors = useMemo(
    () => getError(inputState.name),
    [inputState.name, getError, clearError]
  );

  const { getVerbiage } = useVerbiage(inputState?.verbiage?.uuid);

  const Html = useMemo(
    () => (
      <>
        <label for={inputState?.id} className={inputState?.label?.className}>
          {getVerbiage(inputState?.verbiage?.key)}
        </label>
        <input
          {...inputState}
          onChange={(e) =>
            setInputState((prev) => ({ ...prev, value: e.target.value }))
          }
          value={inputState.value}
        />
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
    [inputState, errors, clearError]
  );

  return {
    /**
     *@description This function is used to set the inputs properties
     * @param {{
     * className: "",
     * id: "",
     * type: "",
     * name: "",
     * value: "",
     * label: {className: "form-label"},
     * verbiage: {
     *   uuid: "",
     *   key: "",
     * }}} properties
     * @returns void
     */
    setProperties: (properties = {}) => {
      setInputState((prev) => ({
        ...prev,
        ...properties,
        value: properties.value != null ? properties.value : prev.value,
      }));
    },
    value: inputState.value,
    Html,
    /**
     * @description This is used to clear input errors specific to this input
     * @returns void
     */
    clearError: () => clearError(inputState?.name),
    /**
     *@description This function is used to set the inputs value
     * @param {string} newValue
     * @returns void
     */
    setValue: (newValue) =>
      setInputState((prev) => ({ ...prev, value: newValue })),
  };
}